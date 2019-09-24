# BNBridge

![Image of Harmony BNBridge](https://lh3.googleusercontent.com/Sga-OYWgE4f-Gqsu_qOp9ROswSh2IhZnfI0xWsW6dV9YbJZ87sCQbga3OnAPfcCJY_ulPTnLW5BNA54UhT0p5ez-9aVawyI6lzIYNNgOhWCDbvyuKXAqp7hLCeQ8BJFx9YICqJA61_RPEiR4n1DIk5V4qUHcmCeQdyoWuL74X0iOKBXeluvAsY973oF4v5eyrqcq2cOgMtlaykDMemhFPwYMBAMOJE8BChJOkiPZ2yOLV-gn1DCJu6-bbX61jL6Vopc0UJVc_cR3-DMdPKfqsdWi5wKh2Pd-QTNbP-FpV_JZR00jbJ7Vt-wBrF_M4AfzXmhBktZzK6J89vRV19-kbHHzJfCOtdAME3UckagvwiV1sFOWwMZIGu2VKaeDrU1c81hVjldYy9gf3Iog_EwsYhbaZ9JnXEYBHepiL7FkI0fBHyfBmcVz1BKiffiKqrEBtNvpGHgfDT2s3pySo77_yVcP6TUaBpzy9pCtV3aPRjMKVzFcwtMWlUv24LFBE-sOp-DzRJVpSb2pe_iIsvVl_o0SNAHgzJ1Trtt6q63atYjSxwLTig4NOOiKLjye3SN1tUzdBmquSTRhvQyRgyG5cEqWPSMdP5aBQSJ1YfGucZkI7ixuTH0ZlyxifBkLSqoGsUwnTbbL3AL46DQX8qt91o9QWZ-wO40w7MOv_7BQIn8NJB-mIvkI=w914-h448-no)

### Features:
- [x] Token swap from BEP2 to ERC20 for Harmony.One (ONE).
- [x] Create a new BNB account.

### Repository
## ./bnbridge
Front end website allowing for BNB to ERC bridge support.

## ./cli
Binance CLI utility.

## ./sdk
API used to interact with the CLI utility, Binance javascript SDK and Web3.js to enable BNB to ERC bridge utility.

### Installation
    sudo apt-get install libudev-dev libusb-dev usbutils
    (for unix/linux) npm install --save node-pty-linux

    first, install bnbcli binaries following https://docs.binance.org/api-reference/cli.html#cli-installation
    and place the binaries (bnbcli/tbnbcli) in cli/node-binary directory.

    mkdir -p <root>/cli/node-binary;
    git clone https://github.com/binance-chain/node-binary.git
    cp */0.5.8.1/linux/*bnbcli <root>/cli/node-binary/.

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
