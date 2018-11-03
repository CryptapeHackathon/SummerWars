pragma solidity ^0.4.19;

import "./story.sol";
import "../register.sol";
import "../data/identity.sol";


/// @title First story
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
/// @dev TODO Refactor
///           Add modifier
contract FirstStory is Story {
    Register register;
    bytes32[8] dialog = [
        bytes32("need weapon?"),
        bytes32("yes"),
        bytes32("no")
    ];

    /// Constructor
    constructor() public {
        register = Register(msg.sender);
    }

    ///@notice Process
    function process(address _from, address _to, uint256 decision) public {
        if (decision == 1) {
            Identity id = Identity(register.idAddr(_from));
            /* solium-disable-next-line */
            id.setWeapon(block.timestamp, _from);
            emit Process(_from, _to, "get a weapon");
        }

        if (decision == 2) {
            emit Process(_from, _to, "no need weapon");
        }
    }

    ///@notice Get the info
    function info(address _from) public view returns (bytes32[8]) {
        // Just clear the warning
        _from;
        return dialog;
    }
}
