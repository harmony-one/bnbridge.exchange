require('dotenv').config();

const config = {
	host: process.env.DBHOST || "13.52.142.50",
	database: process.env.DBNAME || "harmonyone",
	user: process.env.DBUSER || "postgres",
	password: process.env.DBPASSWORD || "postgresharmony",

	//Binance
	api: "https://dex.binance.org/", //live
	filePath: process.env.HOME + "/bnbridge.exchange/cli/node-binary/", //live
	fileName: "bnbcli", //live
	chainID: "Binance-Chain-Tigris", //live
	nodeData: "https://dataseed5.defibit.io:443", //live
	nodeHTTPS: "https://dataseed5.defibit.io:443", //live
	keyPrepend: "LIVE_",
	list_proposal_deposit: "100000000000",
	prefix: 'bnb',
	network: 'mainnet',

	// Emailer
	emailerUser: "",
	emailerPassword: "",

	//Ethereum
	provider: 'https://mainnet.infura.io/v3/4a1a3bdd85e7423a86c6031a792a9e63',

  erc20ABI: [
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_spender",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "approve",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "showMeTheMoney",
  		"outputs": [],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "transfer",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_from",
  				"type": "address"
  			},
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "transferFrom",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"anonymous": false,
  		"inputs": [
  			{
  				"indexed": true,
  				"name": "_from",
  				"type": "address"
  			},
  			{
  				"indexed": true,
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"indexed": false,
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "Transfer",
  		"type": "event"
  	},
  	{
  		"anonymous": false,
  		"inputs": [
  			{
  				"indexed": true,
  				"name": "_owner",
  				"type": "address"
  			},
  			{
  				"indexed": true,
  				"name": "_spender",
  				"type": "address"
  			},
  			{
  				"indexed": false,
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "Approval",
  		"type": "event"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "_owner",
  				"type": "address"
  			},
  			{
  				"name": "_spender",
  				"type": "address"
  			}
  		],
  		"name": "allowance",
  		"outputs": [
  			{
  				"name": "remaining",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "_owner",
  				"type": "address"
  			}
  		],
  		"name": "balanceOf",
  		"outputs": [
  			{
  				"name": "balance",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "decimals",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "name",
  		"outputs": [
  			{
  				"name": "",
  				"type": "string"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "symbol",
  		"outputs": [
  			{
  				"name": "",
  				"type": "string"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "totalSupply",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	}
  ]
}

let configCopy = Object.assign({}, config);
delete configCopy.erc20ABI
console.log(configCopy);

module.exports = config
