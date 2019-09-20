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
# psql -c "ALTER USER $DBUSER WITH PASSWORD $DBPASSWORD;"

sudo -u $DBUSER dropdb $DBNAME
sudo -u $DBUSER createdb -O $DBUSER $DBNAME
# Creating tables from setup.sql
sudo -u $DBUSER psql "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -f ${PWD}/setup.sql


# # Gen encryption keys and encrypted password
var=$(ISTESTNET=0 PRIVATE_KEY=$PRIVATE_KEY KEY=$KEY CLIPASSWORD=$CLIPASSWORD node keygen.js)
bnbPubKey=bnb_pub_key #$(echo $var | cut -d, -f1)
bnbAddress=bnb1a03uvqmnqzl85csnxnsx2xy28m76gkkht46f2l #$(echo $var | cut -d, -f2) # bnb1a03uvqmnqzl85csnxnsx2xy28m76gkkht46f2l
bnbEncrSeed=bnb_encr_seed #$(echo $var | cut -d, -f3)
bnbEncrKey=bnb_encr_key #$(echo $var | cut -d, -f4)
echo "bnbEncrSeed = $bnbEncrSeed"
echo "bnbEncrClipassword = $bnbEncrClipassword"
echo "bnbEncrKey = $bnbEncrKey"
echo "bnbPubKey = $bnbPubKey"
echo "bnbAddress = $bnbAddress"

# # Gen encryption keys and encrypted password
# # var=$(ISTESTNET=1 PRIVATE_KEY=$CLIENT_PRIVATE_KEY KEY=$CLIENT_KEY CLIPASSWORD=$CLIENT_CLIPASSWORD node keygen.js)
# # clientBnbPubKey=$(echo $var | cut -d, -f1)
# # clientBnbAddress=$(echo $var | cut -d, -f2)
# # clientBnbEncrSeed=$(echo $var | cut -d, -f3)
# # clientBnbEncrKey=$(echo $var | cut -d, -f4)
# # echo "clientBnbEncrSeed = $clientBnbEncrSeed"
# # echo "clientBnbEncrClipassword = $clientBnbEncrClipassword"
# # echo "clientBnbEncrKey = $clientBnbEncrKey"
# # echo "clientBnbPubKey = $clientBnbPubKey"
# # echo "clientBnbAddress = $clientBnbAddress"

erc20_address=0x1Cc4610217cF242B1Fa2EC14541cca960cC554d3
eth_account_address=0xE25ABC3f7C3d5fB7FB81EAFd421FF1621A61107c
eth_private_key=67c1f71ab0467e9d13a837736c035f2fbf2962d25b98676af697be2416d3f531
echo "erc20_address = $erc20_address"
echo "eth_account_address = $eth_account_address"
echo "eth_private_key = $eth_private_key"

# # set -o history

# # You should keep your own copy of the following secrets. unset to ensure safety.
# # You might also need to clear bash history to avoid leaking secrets.
# # unset DBPASSWORD
# # unset PRIVATE_KEY

psql --user $DBUSER "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
  insert into eth_accounts (uuid, private_key, address) VALUES (
    'erc_account_uuid',
    '$eth_private_key',
    '$eth_account_address'
  );
"

# psql --user $DBUSER "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
#   insert into client_accounts_eth VALUES (
#     'erc_account_uuid',
#     '$eth_account_address',
#     'bnb_account_uuid_client',
#     now()
#   );
# "

psql --user $DBUSER "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
  INSERT INTO bnb_accounts VALUES (
    'bnb_account_uuid',
    '$bnbPubKey',
    '$bnbEncrSeed',
    '$bnbAddress',
    'bnbcli-keyname-optional',
    '$bnbEncrKey',
    now()
  );
"

# psql --user $DBUSER "postgresql://$DBUSER:$DBPASSWORD@localhost/$DBNAME" -c "
#   INSERT INTO client_bnb_accounts VALUES (
#     'bnb_account_uuid_client',
#     '$clientBnbPubKey',
#     '$clientBnbEncrSeed',
#     '$clientBnbAddress',
#     'client-bnbcli-keyname-optional',
#     '$clientBnbEncrKey',
#     now()
#   );
# "

token_uuid=Harmony_One

# {"mintable":true,"name":"Harmony.One","original_symbol":"ONE",
# "owner":"bnb1a03uvqmnqzl85csnxnsx2xy28m76gkkht46f2l","symbol":"ONE-5F9",
# "total_supply":"12600000000.00000000"}

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
    '$token_uuid', 'Harmony.One', 'ONE', 'ONE-5F9', 12600000000.00000000,
    '$erc20_address',
    'erc_account_uuid', 'bnb_account_uuid',
    true, true, 'list_proposal_uuid',
    true, now(), true, 0, 0, now(), true, false
  );
"
