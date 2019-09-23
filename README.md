# BNBridge

![Image of Harmony BNBridge](https://lh3.googleusercontent.com/dzgtb9L6kygOp6Q_VENmqOL_xkOZOPrVofVnqMq_KyFWjNfE8G4seS8M4HFE-FU-4Wmt-iQxHj__aTji7UV7GodU6NxXD8oJ4oPLre0PTLOJeQv3WhHyaKc2486rSy6YtP36pE5Mdb2Akl2fpZ07LPH5KJnRsNzNmBxXhrFtnOTqcP_0JKNBGE91RpSPUizqvc-_IYc_zpnDoaZOF5lMCemj8ryfrkbejGcWpGXim7Qg1vWLqJwXWrCPu8GdzSdmcxOO4SLkwqsuhQx7z6S7fdeLVBkdYzbsebBPRtv273ATzWrFK8abmQIpI1zExErxFw1dRTDW91OxddjqSzgLgbD8nGolz6rHcp-inooN9OP1H1GGaCd2jLeOJ2CuAsMtqcLRXkLeC6J10dV5n94KXvdnHijiEWZjEQXXNp3cYkvo7EN2zpMhRIwA9MtfdK3qNQkLKFhHWoWYSK4PsWapHQEaejrWEQxZqw6keSe8jmKX9c2AZBxoYD8P1qbswhcvRoSEO4z-2DSe7RVok3cr_5qMou5rxEqpTI1Ys5p9oaYm3ZtM3g4iSMRbDb36ZkbWwnWETF-FQlBP7KGApXC7eKO__BibmyWYQhnz0U3kSTdJyGH-gFsautWFbzN2iuV-AF05dM9GndVfWBge2SrBMG4QQe8EG4W_PoOKA3nvmX7gPipJrNFxk_RC1nwUvzSeDnqweB4goHYlTSxJgVBEayRHEOuu61kNQJAecAZq6QWU0g=w1096-h771-no)

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
