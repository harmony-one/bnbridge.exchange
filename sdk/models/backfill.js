const models = require('../models')
const bnb = require('../helpers/bnb.js');

const yargs = require('yargs');

const argv = yargs
  .command('bnb', 'backfill bnb transfer', function (yargs) {
    return yargs.options({
      'b': {
        alias: 'bnbaddress',
        demandOption: true,
        describe: 'which bnb address to backfill for',
        type: 'string'
      },
      'a': {
        alias: 'amount',
        demandOption: true,
        describe: 'how much (in float) to backfill transfer from the input address',
        type: 'number'
      },
      'f': {
        alias: 'fundBnb',
        default: false,
        describe: 'if set true, first transfer BNB fee for funding gas',
        type: 'boolean'
      }
    })
  })
  .command('eth', 'eth operation', function (yargs) {
    return yargs.options({})
  })
  .help()
  .alias('help', 'h')
  .argv;

const cmd = argv._[0]

if (cmd === 'bnb') {
  const BNB_FUND_ACCT_PRIVATE_KEY = ''
  const BNB_FOUNDATION_ACCT_ADDRESS = 'bnb1xwvm73088qrhq8aykcunsq25x2ymxc7pyg7tpj'

  const BNB_GAS_FEE = 0.000375 // in BNB

  const bnbaddress = argv.bnbaddress
  const amount = argv.amount
  const fundBnb = argv.fundBnb

  console.log(bnbaddress, amount, fundBnb);

  models.getClientBnbKey(bnbaddress, (err, key) => {
    if (err || !key) {
      console.error('[ERROR] getClientBnbKey', err)
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
}

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

if (cmd === 'eth') {
  const eth_address = '0x8bD3cbbb920c0540eCA25c7e2DCcA61C43c31dDA';
  models.getClientEthKey(eth_address, (err, key) => {
    if (err || !key) {
      const cbError = err || 'getClientEthKey: Unable to retrieve key'
      console.error('[Error] ' + cbError)
      return
    }
    console.log(`decrypted key ${JSON.stringify(key)}`);
    return key;
  })
}
