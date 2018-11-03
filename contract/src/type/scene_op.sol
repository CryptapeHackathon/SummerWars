pragma solidity ^0.4.24;

/// @title The data and event of sceneOp
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract SceneOpType {

    event NameSetted(
        string _name,
        address indexed _scene,
        address indexed _sender
    );

    event DescriptionSetted(
        string _description,
        address indexed _scene,
        address indexed _sender
    );

    event LocationSetted(
        uint indexed _x,
        uint indexed _y,
        address indexed _scene,
        address _sender
    );

    event KindSetted(
        uint8 indexed _kind,
        address indexed _scene,
        address indexed _sender
    );

    event ProxySetted(
        address indexed _proxy,
        address indexed _scene,
        address indexed _sender
    );

    event Processed(
        address indexed _to,
        uint indexed _decision,
        address indexed _scene,
        address _sender
    );
}
