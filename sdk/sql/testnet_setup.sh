#!/bin/bash

export DBUSER="dennis.won"
if [[ -z $DBUSER ]]; then
  echo "Export DBUSER to environment variable"
  exit
fi

export DBPASSWORD=harmony
if [[ -z $DBPASSWORD ]]; then
  echo "Export DBPASSWORD to environment variable"
  exit
fi

export DBNAME=harmonyone
if [[ -z $DBNAME ]]; then
  echo "Export DBNAME to environment variable"
  exit
fi

export KEY=hmy
if [[ -z $KEY ]]; then
  echo "Export KEY to environment variable"
  exit
fi

export PRIVATE_KEY=e6a7016972d3ab51c4badf3dc1ea759a38910886c98756e1b9a6951af2aba2d2
if [[ -z $PRIVATE_KEY ]]; then
  echo "Export PRIVATE_KEY to environment variable"
  exit
fi

# set +o history

# linux only
# sudo adduser $DBUSER
# sudo -u postgres createuser --superuser $DBUSER
# sudo -u postgres psql -c "ALTER USER $DBUSER WITH PASSWORD '$DBPASSWORD';"
psql -c "ALTER USER \"dennis.won\" WITH PASSWORD 'harmony';"

sudo -u $DBUSER dropdb $DBNAME
sudo -u $DBUSER createdb -O $DBUSER $DBNAME
# Creating tables from setup.sql
sudo -u $DBUSER psql "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -f ${PWD}/setup.sql


# Gen encryption keys and encrypted password
var=$(ISTESTNET=1 PRIVATE_KEY=$PRIVATE_KEY KEY=$KEY CLIPASSWORD=$CLIPASSWORD node keygen.js)
pubKey=$(echo $var | cut -d, -f1)
address=$(echo $var | cut -d, -f2)
encr_seed=$(echo $var | cut -d, -f3)
encr_key=$(echo $var | cut -d, -f4)
echo "encr_seed = $encr_seed"
echo "encr_clipassword = $encr_clipassword"
echo "encr_key = $encr_key"
echo "pubKey = $pubKey"
echo "address = $address"


# Polulate bnb_accounts and tokens table
# sudo -u $DBUSER psql "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
#   INSERT INTO bnb_accounts VALUES (
#     '5a89c14e-5385-4e4e-93c0-270c54ffd49e',
#     '$pubKey',
#     '$encr_seed',
#     '$address',
#     'bnbcli-keyname-optional',
#     '$encr_key',
#     now()
#   );
# "

# sudo -u $DBUSER psql "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
#   INSERT INTO tokens VALUES (
#     'd63380b5-4873-46a4-b74e-3afa72d41cc5',
#     'TLIT NETWORK BEP2 Testnet',
#     'TLIT',
#     'LIT-D26',
#     145034756,
#     '0x65fc0f7d2bb96a9be30a770fb5fcd5a7762ad659',
#     true,
#     1000,
#     0,
#     'eth-uuid-optional-testnet',
#     '5a89c14e-5385-4e4e-93c0-270c54ffd49e',
#     true,
#     true,
#     'listing-proposal-uuid-testnet',
#     true,
#     now()
#   );
# "


# set -o history

# You should keep your own copy of the following secrets. unset to ensure safety.
# You might also need to clear bash history to avoid leaking secrets.
# unset DBPASSWORD
# unset PRIVATE_KEY

psql --user $DBUSER "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
  insert into eth_accounts VALUES (
    'erc_account_uuid',
    'erc_account_private_key',
    '0x666d9dAc081cCEa209091D6e06D76678B09DccA3',
    now(),
    'erc_account_encr_key'
  );
"

psql --user $DBUSER "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
  insert into tokens (
    uuid,
    name,
    symbol,
    unique_symbol,
    total_supply,
    erc20_address,
    eth_account_uuid,
    bnb_account_uuid,
    processed,
    listing_proposed,
    listing_proposal_uuid,
    listed,
    created,
    mintable,
    minimum_swap_amount,
    fee_per_swap,
    process_date,
    bnb_to_eth_enabled,
    eth_to_bnb_enabled
  ) values (
    'ONE_uuid', 'Harmony ONE', 'ONE', 'ONE-C00', 10000000000,
    '0x666d9dAc081cCEa209091D6e06D76678B09DccA3',
    'erc_account_uuid', 'bnb_account_uuid',
    true, true, 'list_proposal_uuid',
    true, now(), true, 1000, 0, now(), true, false
  );
"
