pragma solidity ^0.4.19;

import "./data/scene.sol";
import "./type/scene_op.sol";


/// @title Scene operate
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract SceneOp is SceneOpType {
    
    // function SceneOp() public {}

    /// @notice Set name
    function setName(string _name, address _scene)
        external 
    {
        Scene scene = Scene(_scene);
        scene.setName(_name, msg.sender);
        NameSetted(_name, _scene, msg.sender);
    }

    /// @notice Set description
    function setDescription(string _description, address _scene)
        external
    {
        Scene scene = Scene(_scene);
        scene.setDescription(_description, msg.sender);
        DescriptionSetted(_description, _scene, msg.sender);
    }

    /// @notice Set location
    function setLocation(uint x, uint y, address _scene)
        external
    {
        Scene scene = Scene(_scene);
        scene.setLocation(x, y, msg.sender);
    }

    /// @notice Set kind
    function setKind(uint8 _kind, address _scene)
        external
    {
        Scene scene = Scene(_scene);
        scene.setKind(_kind, msg.sender);
        KindSetted(_kind, _scene, msg.sender);
    }

    /// @notice Set proxy
    function setProxy(address _proxy, address _scene)
        external
    {
        Scene scene = Scene(_scene);
        scene.setProxy(_proxy, msg.sender);
        ProxySetted(_proxy, _scene, msg.sender);
    }

    /// @notice Call proxy process function
    function process(address _to, uint256 _decision, address _scene)
        external
    {
        Scene scene = Scene(_scene);
        scene.process(_to, _decision, msg.sender);
        Processed(_to, _decision, _scene, msg.sender);
    }
}
