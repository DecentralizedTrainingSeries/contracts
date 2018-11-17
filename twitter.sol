pragma solidity ^0.4.25;

/**
* DTS - Simple Contract
**/

contract Twitter {    
    //Variables declaration
    string public tweetMessage;
    
    //constructor
    constructor(string _newTweet) public {
        tweetMessage = _newTweet;
    }
    
    //Methods (Setter/Getter)
    function setMessage(string _m) public {
        tweetMessage = _m;
    }
    
    function getMessage() public view returns(string) {
        return tweetMessage;
    }    
}//end contract
