pragma solidity ^0.4.19;


/// @title WorldInfo
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract WorldInfo {
    
    address public scenes;
    mapping (address => address[]) users;

    /// Save register's address
    function WorldInfo() public {}

    function getUsers(address scene) view returns (address[]) {}
    
    function addScene(address scene) public {}
    function deleteScene(address scene) public {}
    
    function user_enter(address scene, address user) public {}
    function user_leave(address scene, address user) public {}
    function set_name(string _name) public returns (bool) {}
}
