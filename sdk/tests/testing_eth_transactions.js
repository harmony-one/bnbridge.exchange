const Web3 = require('web3');
const config = require('../config')

var web3 = new Web3(new Web3.providers.HttpProvider(config.provider));

const contractAddress = '0xD379255277e87E3636708A71F7A845A86f8c591d'
const accountAddress = '0xBE2E9AAd36a3C3C0c189A9C1f2e4E73bCD472a57'
const depositAddress = '0xBE2E9AAd36a3C3C0c189A9C1f2e4E73bCD472a57'

function getTransactions(contractAddress, accountAddress, depositAddress, callback) {

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
        console.log(amount)
        return true
      }
    })

    callback(null, returnEvents)
  })
  .catch(callback);

}


getTransactions(contractAddress, accountAddress, depositAddress, (err, result) => {
  if(err) {
    console.log("ERR")
    console.log(err)
    return
  }

  console.log(result)
})
