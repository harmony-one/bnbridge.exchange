const db = require('../helpers/db.js').db;
const bnb = require('../helpers/bnb.js')
const models = require('../models')

const HMY_UUID = 'Harmony_One                         '
const HMY_BNB = 'bnb1xwvm73088qrhq8aykcunsq25x2ymxc7pyg7tpj'
const HMY_ASSET_SYMBOL = 'ONE-5F9'
const KEY = 'witness canyon foot sing song tray task defense float bottom town obvious faint globe door tonight alpha battle purse jazz flag author choose whisper';

const processing = {
    finalizeSwaps() {
        db.manyOrNone("select swaps.uuid, swaps.amount, ae.client_bnb_account_uuid from swaps left join client_accounts_eth ae on ae.uuid=swaps.client_account_uuid where swaps.token_uuid = $1 and swaps.deposit_transaction_hash is not null and swaps.transfer_transaction_hash is not null and swaps.processed is null;", [HMY_UUID])
            .then((swaps) => {
                // for testing only.
                // swaps = [swaps[0]]
                for (swap of swaps) {
                    if (swap.amount < 5) {
                        continue
                    }
                    console.log('minh', swap)
                    db.oneOrNone("select * from client_bnb_accounts where uuid=$1", [swap.client_bnb_account_uuid])
                        .then(key => {
                            const dbPassword = key.encr_key
                            const password = KEY + ':' + dbPassword
                            const mnemonic = models.decrypt(key.seed_phrase, password)

                            console.log(mnemonic, swap.amount, swap.uuid)
                            if (swap.amount > 5) {
                                // bnb.transfer(mnemonic, HMY_BNB, swap.amount, HMY_ASSET_SYMBOL, `backfill ${swap.uuid}`, (err, result) => {
                                //     if (err) {
                                //         console.log(`error when transfering to hmy account`)
                                //     } else {
                                //     db.none('update swaps set processed = true where uuid = $1;', [swap.uuid])
                                //         .then(() => console.log(`update swap back-fill ${swap.uuid}`))
                                //         .catch(err => console.log(err))
                                //     }
                                // })
                            } else {
                                console.log('can not swap' , swap)

                            }

                            // db.oneOrNone('select key_name, seed_phrase as mnemonic, password, encr_key from bnb_accounts where address = $1;', [address])
                            //     .then((key) => {
                            //         if (key.encr_key) {
                            //             const dbPassword = key.encr_key
                            //             const password = KEY + ':' + dbPassword
                            //             key.password_decrypted = models.decrypt(key.password, password)
                            //             key.mnemonic = models.decrypt(key.mnemonic, password)
                            //         }
                            //         callback(null, key)
                            // console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    break
                }
                // db.oneOrNone('insert into client_bnb_accounts(uuid, public_key, address, seed_phrase, key_name, password, encr_key, created) values (md5(random()::text || clock_timestamp()::text)::uuid, $1, $2, $3, $4, $5, $6, timezone(\'utc\', now())) returning uuid, address;',
                //     [keyData.publicKey, keyData.address, aes256seed, keyName, aes256password, dbPassword])
                // db.oneOrNone('select bnb.* from tokens tok left join bnb_accounts bnb on tok.bnb_account_uuid = bnb.uuid where tok.uuid = $1;', [HMY_UUID])
                // console.log(swaps)
                // callTransfer(token, swaps)
            })
            .catch(err => {
                console.log(err)
            })
    },
}

// const mnemonic = 'cover assist prize discover best cricket sad swarm castle autumn unusual rain space fence around blind right skirt feel worry moon blind globe change'
// const swap = {
//     amount: 8,
//     uuid: '20822df6-7aa3-82d5-170e-a5bad0ae0347'
// }
// bnb.transfer(mnemonic, HMY_BNB, 4, HMY_ASSET_SYMBOL, `backfill ${swap.uuid}`, (err, result) => {
//     if (err) {
//         console.log(`error when transfering to hmy account`, err)
//     }
//     // db.none('update swaps set processed = true where uuid = $1;', [swap.uuid])
//     //     .then(() => console.log(`update swap back-fill ${swap.uuid}`))
//     //     .catch(err => console.log(err))
//     // // update
// })

module.exports = processing

