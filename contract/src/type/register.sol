pragma solidity ^0.4.19;


/// @title The data and event of register
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Reg {

    address public userOpAddr;
    address public sceneOpAddr;
    address public worldInfoAddr;
    address public fightStoryAddr;

    mapping (address => address) public idAddr;

    event RegisterCreated(
        address indexed _userOp,
        address indexed _sceneOp,
        address indexed _worldInfo,
        address _fightStory,
        address _register
    );

    event IdNewed(
        address indexed _idAddr,
        address indexed _id,
        string _name,
        address _sender
    );

    event SceneNewed(
        address indexed _sender,
        address indexed _scene
    );
}
