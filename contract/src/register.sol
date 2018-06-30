pragma solidity ^0.4.19;

import "./type_register.sol";
import "./identity.sol";
import "./scene.sol";
import "./world_info.sol";
import "./user_op.sol";
import "./scene_op.sol";
import "./fight_story.sol";
import "./first_story.sol";


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

    modifier onlyOnce {
        require(initFlag == false);
        _;
    }

    /// @notice init all scenes
    function init_scenes()
        public
        onlyOnce
        returns (bool)
    {
        fightAddr = newScene(this, "fight", fightStoryAddr);
        firstAddr = newScene(this, "first", firstStoryAddr);
        initFightStory(fightAddr);
        initFirstStory(firstAddr);
        initFlag = true;
        InitScene(fightAddr, firstAddr);
    }

    /// @notice Register a new identity
    function newId(
        address _id
    )
        public 
        returns (bool)
    {
        idAddr[_id] = new Identity(_id, firstAddr);
        IdNewed(idAddr[_id], _id, msg.sender);
        WorldInfo world = WorldInfo(worldInfoAddr);
        require(world.userEnter(firstAddr, _id));
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
        op.setDescription("welcome to the Middle-earth, Please start your journey.", _first);
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
        op.setDescription("Let's fight!", _fight);
        op.setLocation(3, 4, _fight);
        op.setKind(2, _fight);
        return true;
    }
}
