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
        fightAddr = newScene(this, "fight story", fightStoryAddr);
        firstAddr = newScene(this, "first story", firstStoryAddr);
        initFightStory(fightAddr);
        initFirstStory(firstAddr);

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
        idAddr[_id] = new Identity(_id, _name, firstAddr);
        IdNewed(idAddr[_id], _id, _name, msg.sender);
        return true;
    }

    /// @notice Register a new identity
    function newScene(
        address _owner,
        string _name,
        address _proxy
    )
        public 
        returns (address sceneAddr)
    {
        sceneAddr = new Scene(_owner, _name, _proxy);
        WorldInfo world = WorldInfo(worldInfoAddr);
        world.addScene(sceneAddr);
    }

    /// @notice Init the first story scene
    function initFirstStory(address _first)
        private
        returns (bool)
    {
        SceneOp op = SceneOp(sceneOpAddr);        
        op.setDescription("hello", _first);
        op.setLocation(1, 2, _first);
        op.setKind(1, _first);
        return true;
    }

    /// @notice Init the fight story scene
    function initFightStory(address _fight)
        private
        returns (bool)
    {
        SceneOp op = SceneOp(sceneOpAddr);        
        op.setDescription("hello", _fight);
        op.setLocation(3, 4, _fight);
        op.setKind(2, _fight);
        return true;
    }
}
