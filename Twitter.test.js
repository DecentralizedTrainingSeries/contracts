const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

//Create an instance to connect to an ethereum network
const web3 = new Web3(ganache.provider());

//Bring in the interface (ABI code) and then the compiled Bytecode
const { interface, bytecode } = require('../compile');

let accounts;
let twitter;

//Code required by Mocha to do some testing on a specific account
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  twitter = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['My tweet!']
    })
    .send({ from: accounts[0], gas: '1000000' });
});

//Testing using some assertions  
describe('Twitter', () => {
  it('deploys a contract', () => {
    assert.ok(twitter.options.address);
  });

  it('has a default message', async () => {
    const message = await twitter.methods.message().call();
    assert.equal(message, 'My tweet!');
  });

  it('can change the message', async () => {
    await twitter.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await twitter.methods.message().call();
    assert.equal(message, 'bye');
  });
});
