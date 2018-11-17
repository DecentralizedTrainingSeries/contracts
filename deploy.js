const HDWalletProvider = require('truffle-hdwallet-provider');

//Create a new provider instance
const Web3 = require('web3');

//We are reading the bytecode from the compile.js once executed
const { interface, bytecode } = require('./compile');

/*Create a new instance for the Infura provider that unlocks a specific account
* account has Ether to be used during deployment. We also provide the Node link
* connect to!
*/
const provider = new HDWalletProvider(
  'this is the mnemonic from your metamask account',
  'this is the link to the infura Rinkeby Network'
);
const web3 = new Web3(provider); //wrap the previous object to a Web3 instance

/*
* Use the web3 instance from above to deploy our contract
*/
const deploy = async () => {

	//step 1: get a list of all account unlocked from the wallet
	const accounts = await web3.eth.getAccounts();

	//print the public key of the account used for deployment 
	console.log('Attempting to deploy from account', accounts[0]);

	/* use one such account to deploy the contract calling the constructor 
	* pass the ABI as a JSON object. Next is the Bytecode of the contract 
	* along with any initial arguments for the constructor of the contract
	*/
	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['My tweet!'] })
		.send({ gas: '1000000', from: accounts[0] }); //send it to the Network

	/* once the contract is deployed we print the address where the contract was  
	* deployed
	*/
	console.log('Contract deployed to', result.options.address);
};
deploy();
