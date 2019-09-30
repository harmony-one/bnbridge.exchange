const config = require('../config')

const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider(config.provider));
const ETH_TX_GAS_PRICE_GWEI = process.env.ETH_TX_GAS_PRICE_GWEI
const ETH_TX_GAS_LIMIT = process.env.ETH_TX_GAS_LIMIT

const eth = {
  createAccount(callback) {
    let account = web3.eth.accounts.create()
    callback(null, account)
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
      console.log(err)
      // callback(err)
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
        if(event.returnValues._from.toUpperCase() == accountAddress.toUpperCase() && event.returnValues._to.toUpperCase() == depositAddress.toUpperCase()) {
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

    myContract.methods.balanceOf(address).call({ from: address })
    .then((balance) => {
      const theBalance = web3.utils.fromWei(balance.toString(), 'ether')
      callback(null, theBalance)
    })
  },

  async sendTransaction(contractAddress, privateKey, from, to, amount, callback) {

    let sendAmount = web3.utils.toWei(amount.toString(), 'ether')

    const consumerContract = new web3.eth.Contract(config.erc20ABI, contractAddress);
    const myData = consumerContract.methods.transfer(to, sendAmount).encodeABI();

    const gasPriceGwei = ETH_TX_GAS_PRICE_GWEI;
    const gasLimit = ETH_TX_GAS_LIMIT;

    const [chainId, nonce] = await Promise.all([web3.eth.net.getId(), web3.eth.getTransactionCount(from, 'pending')]);
    // console.log('chainId: ' + chainId + ', nonce: ' + nonce);

    const tx = {
      from,
      to: contractAddress,

      gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
      gasLimit: web3.utils.toHex(gasLimit),
      value: '0x0',

      gas: 0,
      chainId: chainId,
      nonce: nonce,
      data: myData
    }

    const rawTx = new Tx.Transaction(tx, { chain: 'mainnet', hardfork: 'petersburg' });
    const privKey = Buffer.from(privateKey, 'hex');
    rawTx.sign(privKey);
    const serializedTx = rawTx.serialize();

    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`);

    const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'),
      function (err, hash) {
        if (err) {
          callback(err, null)
        }
        callback(null, hash.toString())
      })
    console.log('Transaction receipt', receipt)
  },

  addAccount(account) {
    const ret = web3.eth.accounts.wallet.add(account)

    return ret
  }
}

module.exports = eth
