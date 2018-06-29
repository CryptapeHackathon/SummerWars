pragma solidity ^0.4.19;


/// @title The data and event of register
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Reg {

    address public userOpAddr;
    address public sceneOpAddr;
    address public worldInfoAddr;
    address public fightStoryAddr;

    event RegisterCreated(
        address indexed _register,
        address indexed _userOp,
        address indexed _sceneOp,
        address _worldInfo,
        address _fightStory
    );

    event IdNewed(
        address indexed _sender,
        address indexed _id
    );

    event SceneNewed(
        address indexed _sender,
        address indexed _scene
    );
}
