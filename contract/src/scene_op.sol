pragma solidity ^0.4.19;


/// @title Scene operate
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract SceneOp {
    
    /// Save register's address
    function SceneOP() public {}


    function set_name(string name) public {}
    function set_description(string description) public {}
    function set_location(uint8 x, uint8 y) public {}
    function set_proxy(address proxy) public {}
   
    // call proxy process function
    function process(address _to, uint256 decision) public {}
    
    // call proxy info function
    function info() view returns (string) {}

}
