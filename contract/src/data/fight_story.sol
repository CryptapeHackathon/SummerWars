pragma solidity ^0.4.19;

import "./story.sol";
import "../register.sol";
import "./identity.sol";

contract FightStory is Story {
    Register register;
    bytes32[8] board;

    // Events
    event Process(address indexed _from, address indexed _to, string _result);

    function FirstStory() public {
        register = Register(msg.sender);
    }

    ///@notice Get the info
    function info(address _from) public view returns (bytes32[8]) {
        return board;
    }

    ///@notice Process
    function process(address _from, address _to, uint256 decision)
        public
    {
        board[0] = bytes32("1:0");
        Process(_from, _to, "player1 win");
    }
}
