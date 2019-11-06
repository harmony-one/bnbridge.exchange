const config = require('../config')

const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const CONTRACT_MANAGER = process.env.ERC20_CONTRACT_MANAGER

const ETH_TX_GAS_PRICE_GWEI = process.env.ETH_TX_GAS_PRICE_GWEI
const ETH_TX_GAS_LIMIT = process.env.ETH_TX_GAS_LIMIT

const web3 = new Web3(new Web3.providers.HttpProvider(config.provider));
const abiDecoder = require('abi-decoder');
abiDecoder.addABI(config.erc20ABI);

const eth = {
  createAccount(callback) {
    let account = web3.eth.accounts.create()
    callback(null, account)
  },

  getSentTransactionsForAddress(contractAddress, sourceAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    return myContract.getPastEvents('Transfer', {
      fromBlock: 8755198,
      toBlock: 'latest',
      filter: { _from: sourceAddress }
    }).then((events) => {
      const returnEvents = events.map((event) => {
        return {
          from: event.returnValues._from,
          to: event.returnValues._to,
          amount: parseFloat(web3.utils.fromWei(event.returnValues._value._hex, 'ether')),
          transactionHash: event.transactionHash
        }
      })

      // console.log(returnEvents);
      if (!callback) return
      return callback(null, returnEvents)
    }).catch((err) => {
      console.error(err)
      if (!callback) return
      return callback(err)
    });
  },

  getTransaction(txHash, callback) {
    web3.eth.getTransaction(txHash)
      .then((txn) => {
        return callback(null, txn)
      })
      .catch((err) => {
        console.error(err)
        callback(err, null)
      });
  },

  getTransactionEvent(txHash) {
    return new Promise((resolve, reject) => {
      web3.eth.getTransactionReceipt(txHash)
        .then((receipt) => {
          resolve(abiDecoder.decodeLogs(receipt.logs)[0])
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        });
    })
  },

  getTransactionsForAddress(contractAddress, depositAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: { _to: depositAddress }
    })
      .then((events) => {
        const returnEvents = events.map((event) => {
          return {
            from: event.returnValues._from,
            to: event.returnValues._to,
            amount: parseFloat(web3.utils.fromWei(event.returnValues._value._hex, 'ether')),
            transactionHash: event.transactionHash
          }
        })
        return callback(null, returnEvents)
      })
      .catch((err) => {
        console.error(err)
        callback(err, null)
      });
  },

  getTransactions(contractAddress, accountAddress, depositAddress, depositAmount, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: { _to: depositAddress, _from: accountAddress }
    })
      .then((events) => {
        let returnEvents = events.filter((event) => {
          if (event.returnValues._from.toUpperCase() == accountAddress.toUpperCase() && event.returnValues._to.toUpperCase() == depositAddress.toUpperCase()) {
            let amount = parseFloat(web3.utils.fromWei(event.returnValues._value._hex, 'ether'))
            return depositAmount == amount
          }
        })
        callback(null, returnEvents)
      })
      .catch((err) => {
        callback(err)
      });

  },

  getERC20Balance(address, contractAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.methods.balanceOf(address).call({ from: CONTRACT_MANAGER })
      .then((balance) => {
        // console.log(balance);
        const theBalance = web3.utils.fromWei(balance.toString(), 'ether')

        callback(null, theBalance)
      })
      .catch(callback)
  },

  getERC20Symbol(contractAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.methods.symbol().call({ from: contractAddress })
      .then((symbol) => {
        // console.log(symbol);
        callback(null, symbol)
      })
      .catch(callback)
  },

  getERC20Name(contractAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.methods.name().call({ from: contractAddress })
      .then((name) => {
        // console.log(name);
        callback(null, name)
      })
      .catch(callback)
  },

  getERC20TotalSupply(contractAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.methods.totalSupply().call({ from: contractAddress })
      .then((supply) => {
        if (!supply) {
          return callback(null, null)
        }

        // console.log(supply);
        const theSupply = web3.utils.fromWei(supply.toString(), 'ether')
        callback(null, theSupply)
      })
      .catch(callback)
  },

  async sendErc20Transaction(contractAddress, privateKey, from, to, amount, callback) {

    const sendAmount = web3.utils.toWei(amount.toString(), 'ether')

    const consumerContract = new web3.eth.Contract(config.erc20ABI, contractAddress);
    const myData = consumerContract.methods.transfer(to, sendAmount).encodeABI();

    const gasPriceGwei = ETH_TX_GAS_PRICE_GWEI;
    const gasLimit = ETH_TX_GAS_LIMIT;

    const nonce = await web3.eth.getTransactionCount(from, 'pending');

    const tx = {
      from,
      to: contractAddress,

      gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
      gasLimit: web3.utils.toHex(gasLimit),
      value: '0x0',

      chainId: 1,
      nonce: nonce,
      data: myData
    }

    console.log('Sending ERC20 transaction', tx);

    const rawTx = new Tx.Transaction(tx, { chain: 'mainnet', hardfork: 'petersburg' });
    const privKey = Buffer.from(privateKey, 'hex');
    rawTx.sign(privKey);
    var serializedTx = rawTx.serialize();
    // Comment out these four lines if you don't really want to send the TX right now
    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`);

    // First approach: working
    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        callback(err, null)
      }
      callback(null, hash)
    }).catch(err => {
      console.error(err)
      callback(err)
    })
    console.log('transaction receipt', receipt)
  },
}

module.exports = eth
