pragma solidity ^0.4.19;


/// @title Story interface
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Story {
    // Events
    event Process(address indexed _from, address indexed _to, string _result);

    function info(address _from) public view returns (bytes32[8]);
    function process(address _from, address _to, uint256 decision) public;
}
