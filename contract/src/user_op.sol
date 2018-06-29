pragma solidity ^0.4.19;

import "./register.sol";
import "./data/identity.sol";


/// @title User operate
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract UserOp {
    Register register;

    /// Save register's address
    function UserOP() public {
        register = Register(msg.sender);
    }

    /// @notice Set Name to the identity
    function setName(string _name)
        public
        returns (bool)
    {
        Identity id = Identity(register.idAddr(msg.sender));
        id.setName(_name, msg.sender);
    }

    /// @notice Update record
    function updateRecord(uint _record)
        public
        returns (bool)
    {
        Identity id = Identity(register.idAddr(msg.sender));
        id.updateRecord(_record, msg.sender);
    }

    function setWeapon(uint256 _id)
        public
        returns (bool)
    {
        Identity id = Identity(register.idAddr(msg.sender));
        id.setWeapon(_id, msg.sender);
    }
    // leave old scene enter new scene
    function setScene(address _scene)
        public
        returns (bool)
    {
        Identity id = Identity(register.idAddr(msg.sender));
        id.setScene(_scene, msg.sender);
    }

    function setJob(uint8 _job)
        public
        returns (bool)
    {
        Identity id = Identity(register.idAddr(msg.sender));
        id.setJob(_job, msg.sender);
    }

    function setProxy(address _proxy, address _id)
        public
        returns (bool)
    {
        Identity id;
        if (_id < 0x100) {
            // for npc
            id = Identity(register.idAddr(_id));
            id.setProxy(_proxy, _id);
        } else {
            id = Identity(register.idAddr(msg.sender));
            id.setProxy(_proxy, msg.sender);
        }
    }

    // call proxy process function
    function process(address _to, uint256 _decision) public pure { _to; _decision; }

    // call proxy info function
    function info() public pure returns (bytes32[8]) {}
}
