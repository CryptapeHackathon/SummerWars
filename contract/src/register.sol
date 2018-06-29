pragma solidity ^0.4.19;

import "./type/register.sol";
import "./data/identity.sol";
import "./data/scene.sol";
import "./data/world_info.sol";
import "./user_op.sol";
import "./scene_op.sol";
import "./data/fight_story.sol";


/// @title Register: identity and scene
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract Register is Reg {

    /// @notice Contructor
    function Register() public {
        userOpAddr = new UserOp();
        sceneOpAddr = new SceneOp();
        worldInfoAddr = new WorldInfo();
        fightStoryAddr = new FightStory();
        RegisterCreated(
            msg.sender,
            userOpAddr,
            sceneOpAddr,
            worldInfoAddr,
            fightStoryAddr
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
        address idAddr = new Identity();
        return true;
    }

    /// @notice Register a new identity
    function newScene(
        address _proxy
    )
        public 
        returns (bool)
    {
        address sceneAddr = new Scene();
        return true;
    }
}
