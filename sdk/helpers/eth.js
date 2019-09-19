const Web3 = require('web3');
const config = require('../config')
var Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(config.provider));

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
      console.log('minh', balance);
      const theBalance = web3.utils.fromWei(balance.toString(), 'ether')

      callback(null, theBalance)
    })
    .catch(callback)
  },

  getERC20Symbol(contractAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.methods.symbol().call({ from: contractAddress })
    .then((symbol) => {
      console.log(symbol);

      callback(null, symbol)
    })
    .catch(callback)
  },

  getERC20Name(contractAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.methods.name().call({ from: contractAddress })
    .then((name) => {
      console.log(name);

      callback(null, name)
    })
    .catch(callback)
  },

  getERC20TotalSupply(contractAddress, callback) {
    let myContract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    myContract.methods.totalSupply().call({ from: contractAddress })
    .then((supply) => {
      if(!supply) {
        return callback(null, null)
      }

      console.log(supply);
      const theSupply = web3.utils.fromWei(supply.toString(), 'ether')

      callback(null, theSupply)
    })
    .catch(callback)
  },

  async sendTransaction(contractAddress, privateKey, from, to, amount, callback) {

    let sendAmount = web3.utils.toWei(amount.toString(), 'ether')
    // let decimals = web3.toBigNumber(18);
    // let value = web3.toBigNumber(amount);
    // let sendAmount = value.times(web3.toBigNumber(10).pow(decimals));


    const consumerContract = new web3.eth.Contract(config.erc20ABI, contractAddress);
    const myData = consumerContract.methods.transfer(to, sendAmount).encodeABI();

    var gasPriceGwei = 3;
    var gasLimit = 3000000;


    const tx = {
      from,
      to: contractAddress,
      // value: '0x0',
      // gasPrice: web3.utils.toWei('3', 'gwei'),
      // gas: 3000000,
      gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
      gasLimit: web3.utils.toHex(gasLimit),
      value: '0x0',

      // gasPrice: web3.utils.toWei('25', 'gwei'),
      // gas: 60000,
      chainId: 3,
      nonce: await web3.eth.getTransactionCount(from,'pending'),
      data: myData
    }

    // const signed = await web3.eth.accounts.signTransaction(tx, privateKey)
    // const rawTx = signed.rawTransaction

    var rawTx = new Tx.Transaction(tx, { chain: 'ropsten', hardfork: 'petersburg' });
    const privKey = Buffer.from(privateKey, 'hex');
    rawTx.sign(privKey);
    var serializedTx = rawTx.serialize();
    // Comment out these four lines if you don't really want to send the TX right now
    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`);

    // First approach: working
    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
      if (err) {
        callback(err, null)
      }
      callback(null, hash.toString())
    })
    console.log(receipt)


    // second approach: working too
    // try {
    //   var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    //   console.log(receipt)
    //   // if (receipt.toString().includes('error')) {
    //   //   callback(receipt, null)
    //   // } else {
    //   //   callback(null, receipt.toString())
    //   // }
    // } catch(err) {
    //   return err
    // }


    // // The receipt info of transaction, Uncomment for debug
    // console.log(`Receipt info: \n${JSON.stringify(receipt, null, '\t')}\n------------------------`);
    // // The balance may not be updated yet, but let's check
    // balance = await contract.methods.balanceOf(myAddress).call();
    // console.log(`Balance after send: ${financialMfil(balance)} MFIL`);


    // const sendRawTx = rawTx =>
    //   new Promise((resolve, reject) =>
    //     web3.eth
    //       .sendSignedTransaction(rawTx)
    //       .on('transactionHash', resolve)
    //       .on('error', reject)
    //   )

    // const result = await sendRawTx(rawTx).catch((err) => {
    //   return err
    // })

    // if(result.toString().includes('error')) {
    //   callback(result, null)
    // } else {
    //   callback(null, result.toString())
    // }

  },
}

const contractAddress = '0xD379255277e87E3636708A71F7A845A86f8c591d'
const privateKey = 'E820CF3B21F946EA2FDE6C00B52A6C2C3E105FA77A5D3ABF236D60E494E7F551'
const from = '0x927270dd3E84a2DcEdaCfc6b2a9109833e149271'
const to = '0x13a2C4b33794bCCc69898B3e2c188ce47916dE84'
const amount = 100

// eth.sendTransaction(contractAddress, privateKey, from, to, amount, function(err, result) {
//   console.log(err, result)
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('no error')
//   }
//   console.log('woohoo')
// })


// eth.getERC20Balance(to, contractAddress, function(err, balance) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('hello')
//   }
// })
module.exports = eth
