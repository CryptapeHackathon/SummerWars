pragma solidity ^0.4.24;

import "../story/story.sol";
import "../register.sol";
import "../world_info.sol";

/// @title Identity
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Identity {

    Register register;
    address owner;
    uint public record;
    uint public weapon;
    address public scene;
    uint8 public job;
    address public proxy;

    /// Save register's address
    constructor(
        address _id,
        address _scene
    )
        public
    {
        register = Register(msg.sender);
        owner = _id;
        scene = _scene;
    }

    modifier onlyOperator {
        require(msg.sender == register.userOpAddr(), "not operator");
        _;
    }

    modifier onlyOwner(address _owner) {
        require(owner == _owner, "not owner");
        _;
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
        // Update the world info
        WorldInfo world = WorldInfo(register.worldInfoAddr());
        world.userLeave(scene, owner);
        world.userEnter(_scene, owner);
        // Update the secene
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

    /// @notice Set proxy
    function setProxy(address _proxy) public {
        proxy = _proxy;
    }

    // @notice call proxy process function
    function process(address _to, uint256 decision, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        Story(proxy).process(_owner, _to, decision);
    }

    // call proxy info function
    function info() public view returns (bytes32[8]) {
        return Story(proxy).info(msg.sender);
    }
}
