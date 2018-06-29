pragma solidity ^0.4.19;

import "./register.sol";
import "./data/identity.sol";


/// @title User operate
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract UserOp {
    /// @notice Set Name to the identity
    function setName(string _name, address _id)
        public
        returns (bool)
    {
        Identity id = Identity(_id);
        id.setName(_name, msg.sender);
        return true;
    }

    /// @notice Update record
    function updateRecord(uint _record, address _id)
        public
        returns (bool)
    {
        Identity id = Identity(_id);
        id.updateRecord(_record, msg.sender);
        return true;
    }

    function setWeapon(uint256 _weaponId, address _id)
        public
        returns (bool)
    {
        Identity id = Identity(_id);
        id.setWeapon(_weaponId, msg.sender);
        return true;
    }
    // leave old scene enter new scene
    function setScene(address _scene, address _id)
        public
        returns (bool)
    {
        Identity id = Identity(_id);
        id.setScene(_scene, msg.sender);
        return true;
    }

    function setJob(uint8 _job, address _id)
        public
        returns (bool)
    {
        Identity id = Identity(_id);
        id.setJob(_job, msg.sender);
        return true;
    }

    // call proxy process function
    function process(address _to, uint256 _decision, address _id)
        public
        returns (bool)
    {
        Identity id = Identity(_id);
        id.process(_to, _decision, msg.sender);
        return true;
    }
}
