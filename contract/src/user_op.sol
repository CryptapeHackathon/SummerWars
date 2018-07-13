pragma solidity ^0.4.19;

import "./register.sol";
import "./data/identity.sol";
import "./type/user_op.sol";


/// @title User operate
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract UserOp is UserOpType {

    Register register;

    /// Constructor
    function userOp() public {
        register = Register(msg.sender);
    }

    /// @notice Update record
    function updateRecord(uint _record)
        external 
    {
        Identity id = getId();
        id.updateRecord(_record, msg.sender);
        RecordUpdated(_record,msg.sender);
    }

    /// @notice Set weapon
    function setWeapon(uint _weaponId)
        external
    {
        Identity id = getId();
        id.setWeapon(_weaponId, msg.sender);
        WeaponSetted(_weaponId, msg.sender);
    }
    
    /// @notice Leave old scene enter new scene
    function setScene(address _scene)
        external
    {
        Identity id = getId();
        id.setScene(_scene, msg.sender);
        SceneSetted(_scene, msg.sender);
    }

    /// @notice Set job
    function setJob(uint8 _job)
        external 
    {
        Identity id = getId();
        id.setJob(_job, msg.sender);
        JobSetted(_job, msg.sender);
    }

    /// @notice Call proxy process function
    function process(address _to, uint _decision)
        public
    {
        Identity id = getId();
        id.process(_to, _decision, msg.sender);
        Processed(_to, _decision, msg.sender);
    }

    /// @notice Private Get identity address of msg.sender 
    function getId()
        private
        returns (Identity id)
    {
        return Identity(register.idAddr(msg.sender));
    }
}
