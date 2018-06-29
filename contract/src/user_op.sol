pragma solidity ^0.4.19;


/// @title User operate
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract UserOp {
    
    /// Save register's address
    function UserOP() public {}

    // call proxy info function
    function info() view returns (bytes32[8] info) {}

    function set_name(string _name) public returns (bool) {}
    function update_record(string _name) public returns (bool) {}
    function set_weapon(uint256 _id) public returns (bool) {}
    // leave old scene enter new scene
    function set_scene(address _scene) public returns (bool) {}
    function set_job(uint8 _job) public returns (bool) {}
    // call proxy process function
    function process(address _to, uint256 decision) {}
}
