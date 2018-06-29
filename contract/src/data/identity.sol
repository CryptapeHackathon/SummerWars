pragma solidity ^0.4.19;

import "./story.sol";
import "../register.sol";


/// @title Identity
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Identity {
    
    Register register;
    address owner;
    string public name;
    uint public record;
    uint public weapon;
    address public scene;
    uint8 public job;
    address public proxy;

    function set_proxy(address _proxy) public {
        proxy = _proxy;
    }

    // call proxy process function
    function process(address _to, uint256 decision) public {
        Story(proxy).process(msg.sender, _to, decision);
    }

    // call proxy info function
    function info() public view returns (bytes32[8] info) {
        return Story(proxy).info(msg.sender);
    }

    /// Save register's address
    function Identity(
        address _id,
        string _name
    )
        public
    {
        register = Register(msg.sender);
        owner = _id;
        name = _name;
    }

    modifier onlyOperator {
        require(msg.sender == register.userOpAddr());
        _;
    }

    modifier onlyOwner(address _owner) {
        require(owner == _owner);
        _;
    }

    /// @notice Set Name
    function setName(string _name, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        name = _name; 
        return true;
    }

    /// @notice Update record
    function updateRecord(uint _record, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        record = _record; 
        return true;
    }

    /// @notice Set weapon
    function setWeapon(uint _weapon, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        weapon = _weapon;  
        return true;
    }

    // @notice Set scene
    //         leave old scene enter new scene
    function setScene(address _scene, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        scene = _scene;  
        return true;
    }

    /// @notice Set job
    function setJob(uint8 _job, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        job = _job;  
        return true;
    }
}
