pragma solidity ^0.4.19;

import "./story.sol";
import "../register.sol";


/// @title Scene
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Scene {

    Register register;
    string public name;
    string public description;
    uint8 location_x;
    uint8 location_y;
    address public proxy;
    // 0 none 1 talk 2 fight
    uint8 public kind;
    address public owner;

    function Scene(
        address _owner,
        string _name
    )
        public
    {

        register = Register(msg.sender);
        owner = _owner;
        name = _name;
    }

    modifier onlyOperator {
        require(msg.sender == register.sceneOpAddr());
        _;
    }

    modifier onlyOwner(address _owner) {
        require(owner == _owner);
        _;
    }

   
    /// @notice Set name
    function setName(string _name, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        name = _name;
        return true;
    }

    /// @notice Set description
    function setDescription(string _description, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        description = _description;
        return true;
    }

    /// @notice Set location
    function setLocation(uint8 x, uint8 y, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        location_x = x;
        location_y = y;
        return true;
    }

    /// @notice Set kind
    function setKind(uint8 _kind, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        kind = _kind;
        return true;
    }

    function setProxy(address _proxy, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        proxy = _proxy;
        return true;
    }

    /// @notice Call proxy process function
    function process(address _to, uint256 decision, address _owner)
        public
        onlyOperator
        onlyOwner(_owner)
        returns (bool)
    {
        Story(proxy).process(_owner, _to, decision);
        return true;
    }

    /// @notice Call proxy info function
    function info()
        public
        view
        returns (bytes32[8])
    {
        return Story(proxy).info(msg.sender);
    }

    function location()
        public
        view
        returns (uint8 x, uint8 y)
    {
        return (location_x, location_y);
    }
}
