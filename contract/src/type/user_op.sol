pragma solidity ^0.4.24;

/// @title The data and event of userOp
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract UserOpType {

    event RecordUpdated(
        uint indexed _recoed,
        address indexed _sender
    );

    event WeaponSetted(
        uint indexed _weapon,
        address indexed _sender
    );

    event SceneSetted(
        address indexed _scene,
        address indexed _sender
    );

    event JobSetted(
        uint8 indexed _job,
        address indexed _sender
    );

    event Processed(
        address indexed _to,
        uint indexed _decision,
        address indexed _sender
    );
}
