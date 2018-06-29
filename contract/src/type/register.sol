pragma solidity ^0.4.19;


/// @title The data and event of register
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Reg {

    address public userOpAddr;
    address public sceneOpAddr;
    address public worldInfoAddr;
    address public fightStoryAddr;
    address public firstStoryAddr;
    address public newsStoryAddr;
    address public firstAddr;
    address public fightAddr;
    bool internal initFlag;

    mapping (address => address) public idAddr;

    event RegisterCreated(
        address indexed _userOp,
        address indexed _sceneOp,
        address indexed _worldInfo,
        address _fightStory,
        address _firstStory,
        address _register
    );

    event InitScene(
        address indexed _fightAddr,
        address indexed _firstAddr
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
