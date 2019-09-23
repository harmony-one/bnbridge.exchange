# BNBridge

![Image of Harmony BNBridge](https://lh3.googleusercontent.com/FE3REDit_y_X4IxU4xEKxD17lZvI4hGInvwAZ7Y3SUNGFeCoY4sN4qFL8VkS8ggagwZHffNUrBy1KcArAX8m2KKMd8L_0-sPKzMby-NJQcXP-wEbPxFwhxCmCgzwZq4c25UIMVegLDV9NhtgXaOAyOcb6FgkTvI6X7SSxA4LO3f4A03fZ1IefjGMNTd97VX_YMwR6G1U8H4cm0ofJ-F4vX9V1IWHsgElXSCrxqBfxXEAHy3hHoRRxcCFBcg12X-5Q8_h0-WjW3Y0IvTqiiYZtwT_KFkPMRC1ludx64oVIOzjQGhIbWqwscfg-AaqRxlrLZevRmz5m9FUv_2_NeFLR-CKXMItyJvHjW93h8CM7aKATDcwS4Lfaabq73kH2IeZcBeNNt5xXYp-qmQkJoRhQi33P8pRI_tbE3aOU9bOTktIywLOkFT3BfWKADUkQ6QsBOtMV6-H1ntJCHbJTQonBkSR5QvmJ_uk0ji-r-Qz6xFUjKOOqY2BMItngWYeOBMu8fmn0G03f3z1K4Y5lcT7Lu7ff7IaAQjjGFhmm3K9jJAD1MP-Mp8iiuE9b3OF-D9EfKzrohwLqVJqNpt_NaJf9c1W2SvfPbySQvdUe6DGhVI6eKIBhskMuzg69_T1c8-2OKncSm8X-ENr_VJ2P4G9UT3qWyeDp3fRuHbysPoY3BUZcaI24sRv=w1043-h700-no)

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
