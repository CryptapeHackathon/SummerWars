pragma solidity ^0.4.19;

import "./story.sol";
import "../register.sol";
import "./identity.sol";

contract FirstStory is Story {
    function FirstStory() public {
        register = Register(msg.sender);
    }
  
    Register register;
    bytes32[8] dialog = [bytes32("need weapon?"), bytes32("yes"), bytes32("no")];

    function info(address _from) public view returns (bytes32[8]) {
        return dialog;
    }

    function process(address _from, address _to, uint256 decision) public {
        if (decision == 1) {
            Identity id = Identity(register.idAddr(_from));
            id.setWeapon(block.timestamp, _from);
            Process(_from, _to, "get a weapon");
        }

        if (decision == 2) {
            Process(_from, _to, "no need weapon");
        }
    }

    // Events
    event Process(address indexed _from, address indexed _to, string _result);
}
