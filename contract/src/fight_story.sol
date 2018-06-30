pragma solidity ^0.4.19;

import "./story.sol";
import "./register.sol";
import "./identity.sol";

contract FightStory is Story {
    Register register;
    bytes32[8] board;

    // Events
    event Process(address indexed _from, address indexed _to, string _result);

    function FirstStory() public {
        register = Register(msg.sender);
    }

    ///@notice Get the info
    function info(address _from) public view returns (bytes32[8]) {
        // Just clear the warning
        _from;
        return board;
    }

    function getDatas(address a)
        public
        view
        returns (bytes32 data)
    {
        Identity player = Identity(register.idAddr(a));
        uint weapon = player.weapon();
        data = keccak256(a, weapon);
    }

    function process(address _from, address _to, uint256 _decision) public {
        // Just clear the warning
        _decision;
        bytes32 from_data = getDatas(_from);
        bytes32 to_data = getDatas(_to);

        uint from_hp = uint(from_data[0]);
        uint from_attack = uint(from_data[1]);
        uint from_defense = uint(from_data[2]);

        uint to_hp = uint(to_data[0]);
        uint to_attack = uint(to_data[1]);
        uint to_defense = uint(to_data[2]);

        uint lost_hp = 0;

        for (uint i = 3; i < 11; i++) {
            uint from_val = uint(from_data[i]);
            uint to_val = uint(to_data[i]);

            if (from_val > to_val) {
                lost_hp = from_attack * 256 / (256 - to_defense);
                if (to_hp <= lost_hp) {
                    Process(_from, _to, "win");
                    board[0] = bytes32(_from);
                    return;
                }
                to_hp = to_hp - lost_hp;
            }

            if (from_val < to_val) {
                lost_hp = to_attack * 256 / (256 - from_defense);
                if (from_hp <= lost_hp) {
                    Process(_from, _to, "fail");
                    board[0] = bytes32(_to);
                    return;
                }
                from_hp = from_hp - lost_hp;
            }
        }

        if (from_hp > to_hp) {
            Process(_from, _to, "win");
            board[0] = bytes32(_from);
        } else {
            Process(_from, _to, "fail");
            board[0] = bytes32(_to);
        }
    }
}
