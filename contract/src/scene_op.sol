pragma solidity ^0.4.19;

import "./data/scene.sol";


/// @title Scene operate
/// @author ["Cryptape Technologies <contact@cryptape.com>"]
contract SceneOp {
    
    // function SceneOP() public {}

    /// @notice Set name
    function setName(string _name, address _scene)
        public
        returns (bool)
    {
        Scene scene = Scene(_scene);
        scene.setName(_name, msg.sender);
        return true;
    }

    /// @notice Set description
    function setDescription(string _description, address _scene)
        public
        returns (bool)
    {
        Scene scene = Scene(_scene);
        scene.setDescription(_description, msg.sender);
        return true;
    }

    /// @notice Set location
    function setLocation(uint8 x, uint8 y, address _scene)
        public
        returns (bool)
    {
        Scene scene = Scene(_scene);
        scene.setLocation(x, y, msg.sender);
        return true;
    }

    /// @notice Set kind
    function setKind(uint8 _kind, address _scene)
        public
        returns (bool)
    {
        Scene scene = Scene(_scene);
        scene.setKind(_kind, msg.sender);
        return true;
    }

    function setProxy(address _proxy, address _scene)
        public
        returns (bool)
    {
        Scene scene = Scene(_scene);
        scene.setProxy(_proxy, msg.sender);
        return true;
    }

    /// @notice Call proxy process function
    function process(address _to, uint256 _decision, address _scene)
        public
        returns (bool)
    {
        Scene scene = Scene(_scene);
        scene.process(_to, _decision, msg.sender);
        return true;
    }
}
