const models = require('../models')
const bnb = require('../helpers/bnb.js');

const BNB_FUND_ACCT_PRIVATE_KEY = '8769cd9e48c5dade144a143556a9f3c6808ddbd21f72865f7e0b0b6f958790a6'
const BNB_FOUNDATION_ACCT_ADDRESS = 'bnb1xwvm73088qrhq8aykcunsq25x2ymxc7pyg7tpj'

const BNB_GAS_FEE = 0.000375 // in BNB

if (process.argv.length < 4) {
  console.error('missing arguments bnbaddress, amount, fundBnb');
  process.exit(1);
}

const bnbaddress = process.argv[2]
const amount = parseFloat(process.argv[3])
const fundBnb = process.argv[4] === 'true' ? true : (process.argv[4] === 'false' ? false : Boolean(process.argv[4]))
console.log(bnbaddress, amount, fundBnb);

models.getClientKey(bnbaddress, (err, key) => {
  if (err || !key) {
    console.error('[ERROR] getClientKey', err)
    return bnbaddress, null
  }

  console.log(`client ${bnbaddress}`, key);
  if (fundBnb) {
    bnb.transferWithPrivateKey(BNB_FUND_ACCT_PRIVATE_KEY, bnbaddress, BNB_GAS_FEE,
      'BNB', 'Bnb gas for re-sending to Foundation', (err, txResult1) => {
        if (err) {
          console.error('[ERROR] bnb transferWithPrivateKey', err)
          return bnbaddress, null
        }

        if (txResult1 && txResult1.result && txResult1.result.length > 0) {
          let resultHash = txResult1.result[0].hash // tx hash that funded bnb account
          console.log('Successfully funded client bnb account: ' + bnbaddress + ' resultHash: ' + resultHash);
          return transfer(bnbaddress, key, amount)
        } else {
          return bnbaddress, null
        }
      })
  } else {
    return transfer(bnbaddress, key, amount)
  }
})

function transfer(bnbaddress, key, amount) {
  bnb.transfer(key.mnemonic, BNB_FOUNDATION_ACCT_ADDRESS, amount, 'ONE-5F9',
    'Re-sending the BNBridge Swap bnb deposit to the foundation account', (err, txResult2) => {

      if (err) {
        console.error(`[ERROR] bnb transfer to client ${bnbaddress}`, err)
        return bnbaddress, null
      }

      if (txResult2 && txResult2.result && txResult2.result.length > 0) {
        const txhash = txResult2.result[0].hash
        console.log(`bnb transfer to client ${bnbaddress} txhash: ${txhash} amount: ${amount}`)
        return bnbaddress, txhash
      } else {
        console.error(`bnb transfer to client ${bnbaddress} amount: ${amount}`, err)
        return bnbaddress, null
      }
    })
}

