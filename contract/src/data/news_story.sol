pragma solidity ^0.4.19;

import "./story.sol";
import "../register.sol";
import "./identity.sol";


contract NewsStory is Story {
    function NewsStory() public {
        register = Register(msg.sender);
    }
  
    Register register;
    bytes32[16] news = [bytes32("England second after Januzaj"),
                        bytes32("Southgate:take any criticism"),
                        bytes32("Colombia not the same"),
                        bytes32("World Cup best XI so far"),
                        bytes32("What's the verdict on VAR?"),
                        bytes32("Japan next stag"),
                        bytes32("Germany say goodbye"),
                        bytes32("China watch TV"),

                        bytes32("kaikai x suyanlong"),
                        bytes32("lianggaoning x gaobicheng"),
                        bytes32("mayufeng x duxiaoyu"),
                        bytes32("heiyinan x yangniu"),
                        bytes32("terry x jan"),
                        bytes32("jan x terry"),
                        bytes32("Danile x anyone"),
                        bytes32("zhouyun x ?")];
    uint index;

    function info(address _from) public view returns (bytes32[8]) {
        // Just clear the warning
        _from;
        bytes32[8] memory sth;
        for (uint i = 0; i < 8; i++) {
            sth[i] = news[index + i];
        }
        return sth;
    }

    function process(address _from, address _to, uint256 decision) public {
        decision;
        if (index == 0) {
            index = 8;
            Process(_from, _to, "talk world cup");
        }

        if (index == 8) {
            index = 0;
            Process(_from, _to, "talk secret");
        }
    }

    // Events
    event Process(address indexed _from, address indexed _to, string _result);
}
