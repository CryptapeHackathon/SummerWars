pragma solidity ^0.4.19;

import "./type/register.sol";
import "./data/identity.sol";
import "./data/scene.sol";
import "./data/world_info.sol";
import "./user_op.sol";
import "./scene_op.sol";
import "./data/fight_story.sol";
import "./data/first_story.sol";

/// @title Register: identity and scene
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Register is Reg {

    /// @notice Contructor
    function Register() public {
        userOpAddr = new UserOp();
        sceneOpAddr = new SceneOp();
        worldInfoAddr = new WorldInfo();
        fightStoryAddr = new FightStory();
        firstStoryAddr = new FirstStory();
        RegisterCreated(
            userOpAddr,
            sceneOpAddr,
            worldInfoAddr,
            fightStoryAddr,
            firstStoryAddr,
            msg.sender
        );
    }

    /// @notice Register a new identity
    function newId(
        address _id,
        string _name
    )
        public 
        returns (bool)
    {
        idAddr[_id] = new Identity(_id, _name);
        IdNewed(idAddr[_id], _id, _name, msg.sender);
        return true;
    }

    /// @notice Register a new identity
    function newScene(
        address _owner,
        string _name
    )
        public 
        returns (bool)
    {
        address sceneAddr = new Scene(_owner, _name);
        return true;
    }
}
