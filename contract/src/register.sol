pragma solidity ^0.4.19;

import "./type/register.sol";
import "./data/identity.sol";
import "./data/scene.sol";
import "./world_info.sol";
import "./user_op.sol";
import "./scene_op.sol";
import "./story/fight_story.sol";
import "./story/first_story.sol";


/// @title Register: identity and scene
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
/// @dev TODO Add scene id
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
    function initScenes()
        external
        onlyOnce
    {
        fightAddr = _newScene(this, "fight", fightStoryAddr);
        firstAddr = _newScene(this, "first", firstStoryAddr);
        require(initFightStory(fightAddr));
        require(initFirstStory(firstAddr));
        initFlag = true;
        InitScene(fightAddr, firstAddr);
    }

    /// @notice Register a new identity
    ///         Use msg.sender as address
    function newId()
        external
    {
        idAddr[msg.sender] = new Identity(msg.sender, firstAddr);
        IdNewed(idAddr[msg.sender], msg.sender);
        WorldInfo world = WorldInfo(worldInfoAddr);
        require(world.userEnter(firstAddr, msg.sender));
    }

    /// @notice Register a new scene
    function newScene(
        address _owner,
        string _name,
        address _proxy
    )
        external
        returns (address sceneAddr)
    {
        sceneAddr = _newScene(_owner, _name, _proxy);
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

    /// @notice Private new scene
    function _newScene(
        address _owner,
        string _name,
        address _proxy
    )
        private
        returns (address sceneAddr)
    {
        sceneAddr = new Scene(_owner, _name, _proxy);
        WorldInfo world = WorldInfo(worldInfoAddr);
        world.addScene(sceneAddr);
    }
}
