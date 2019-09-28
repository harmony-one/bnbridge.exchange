# BNBridge

![Image of Harmony BNBridge](https://photos.google.com/share/AF1QipND-ked_DJSoCnfuFGeSc5zmCLxO_IWO9z0cHcI3yfAxqA4AYOHz938gQbCGUvSgg/photo/AF1QipPbCQwZissdIqTQbt9SG9Q6fBAxILtutfcOwutk?key=VjVlWDd0Q2lRc3JNX0hfSkxHd004VDBkTFBRc2JR)

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
    Modify config urls that the bnbridge.excahnge API is running at. (http://localhost:5000 by default)
