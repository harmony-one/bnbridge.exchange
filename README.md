# BNBridge

![Image of Harmony BNBridge](https://lh3.googleusercontent.com/s_hZZwDzWk8UchO7MXXXHf8Q8uv7Y-VzTxP_OkQ_OmjEmHckuiquV4XFtF5HJEMLUWb7zKchwKKWYzu65Ux5zz-CutNMIV7LQGxKRx6Ej0hKJmtwu2dpEk-__Vc-wsXFWKLkDsa8xWVAPHDFt8q9K2WJhignNhdcvDwXEW3kci_h7ohsw4sgPbfa3fOFV1Uf2sTwi49UfNfltVF0jFvYbTkXz92wIbsG2PdZFAcygutVp7PfYTtuPQzk9HBFvRz-64UGqNi5DkF2sjxb2peWp8qNHmy2O1GwwU9Xfj9I6pZXM8SZNHWHmHsna5p0TGD4nWuG6gYnDP5TMT3a8J9nIKSH2fdSJyY5o876EVY-auMtU90nqj8veE3UW50zjae1_LklaIL3ETm6Ppm8VOAQYRae-XBv0-I7aCqTGcJjXg4uhfPeLMGLN2I0b1u7HlnBz22u-c19BmE6ztimD8ccse_7bQeai4w_D0TWKJFMwkfa1eNO2htuTotnPII2PIYK4dq3OUyOU-AZipLc4pt65RS_rhwqcnsT6lxkBkx6YmX63ULvWz-QdJ2Ips0cjLuUruFBVHpcC-fKZrODHZMjT2xtfxpI1YHWycjfvmCHlpEH7BAbxLm08SyjBRZkI8QAb8P_9weurFPN3vuhkTrRnYDZACiMWQZ8OBiHM4otXA-Q53ODPeevGc7o24AL5EPr_fCkDZJDk-khInqaryhDevNhv375QThjk-GOfTrCuO8Wmg=w926-h513-no)

### Features:
- [x] Swap a token from BEP2 to ERC20 for Harmony.One (ONE).
- [x] Create a new BNB account.

### Repository
## ./bnbridge
Front end website allowing for BNB to ERC bridge support.

## ./cli
Binance CLI utility.

## ./sdk
API used to interact with the CLI utility, Binance javascript SDK and Web3.js to enable BNB to ERC bridge utility.


### Installation
    git clone the repo

    cd ./sdk

    npm install
    run ./sdk/(testnet/mainnet)_setup.sh
    this will internally ./sql/setup.sql to instantiate the DB.
    update ./config/index.js with
        - databse connection details.
        - Binance cli path.
        - Binance connection details for mainnet/testnet.
        - Ethereum connection details for mainnet/testnet.
    node ./api.bnbridge.exchange.js
    or
    pm2 start api.bnbridge.exchange.js

    cd ../bnbridge

    npm install
    vi ./src/config.js
    Modify config urls that the bnbridge.excahnge API is running at. (http://localhost:8000 by default)
