pragma solidity ^0.4.19;

contract Story {
    function info(address _from) public view returns (bytes32[8] info);

    function process(address _from ,address _to, uint256 decision) public;

    // Events
    event Process(address indexed _from, address indexed _to, string _result);
}
