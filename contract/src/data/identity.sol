pragma solidity ^0.4.19;

import "./story.sol";

/// @title Identity
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Identity {
    
    address register;
    address public name;
    uint public recors;
    uint public weapon;
    address public scene;
    uint8 public job;
    address public proxy;

    /// Save register's address
    function Identity() public {}

    function set_name(string _name) public returns (bool) {}
    function update_record(string _name) public returns (bool) {}
    function set_weapon(uint256 _id) public returns (bool) {}
    // leave old scene enter new scene
    function set_scene(address _scene) public returns (bool) {}
    function set_job(uint8 _job) public returns (bool) {}

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
