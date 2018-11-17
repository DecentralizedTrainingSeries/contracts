const path = require('path');
const fs = require('fs');
const solc = require('solc'); //Solidity compiler

//Create the path that points directly to our .sol
// arg1 = __dirname = set to the working dir
// arg2 = contracts folder 
// arg3 = twitter.sol 
const twPath = path.resolve(__dirname, 'contracts', 'Twitter.sol');

//Read the source code from our .sol contract using the fs module
// arg2 = specify the encoding 
const source = fs.readFileSync(twPath, 'utf8');

//Write the compile statement 
//arg1 = the raw source code
//arg2 = the number of contracts we would like to compile
module.exports = solc.compile(source, 1).contracts[':Twitter'];