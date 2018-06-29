pragma solidity ^0.4.19;

import "./story.sol";

/// @title Scene
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Scene {
    function Scene() public{
    owner = msg.sender;
    }

    string public name;
    string public description;
    uint8 location_x;
    uint8 location_y;
    function location() public view returns (uint8 x, uint8 y) {
      return (location_x, location_y);
    }

    address public proxy;
    // 0 none 1 talk 2 fight
    uint8 public kind;
    address public owner;

    function set_name(string _name) public {
        name = _name;
    }
    function set_description(string _description) public {
        description = _description;
    }
    function set_location(uint8 x, uint8 y) public {
        location_x = x;
        location_y = y;
    }
    function set_kind(uint8 _kind) public {
        kind = _kind;
    }
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
}
