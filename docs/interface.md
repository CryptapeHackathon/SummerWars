## MUD like game on Nervos
MUD游戏的特征：

1. 由多个场景组成。每个场景一个文件，在Nervos上每个场景一个合约。
2. 在Nervos上每个玩家一个用户合约，不区分普通玩家和NPC，就像以太坊的内部账户和外部账户。
3. 剧情。剧情的设计是一个专门的合约。使用序列号标识剧情进展，作为属性存放在用户合约里面。
4. 世界信息。场景列表和每个场景里面用户列表。
5. 物品。直接使用ERC721。用户记录当前在使用的装备。
6. 金钱。直接使用ERC20。


## 场景
```
contract SceneInterface {
   function name() view returns (string name);
   function description() view returns (string description);
   function location() view returns (uint8 x, uint8 y);
   
   function proxy() view returns (address proxy);
   // 0 none 1 talk 2 fight
   function type() view returns (uint8 type);
   function owner() view returns (address owner);

   function set_name(string name);
   function set_description(string description);
   function set_location(uint8 x, uint8 y);
   function set_proxy(address proxy)
   
   // call proxy process function
   function process(address _to, uint256 decision);
   
   // call proxy info function
   function info() view returns (bytes32[8] info);
}
```
#### 场景管理
场景的注册合约

## 用户
```
contract UserInterface {
   function name() view returns (string name);
   function record() view returns (uint256 record);
   function weapon() view returns (uint256 id);
   function scene() view returns (address scene);
   function job() view returns (uint8 job);
   // npc need proxy contract address point to story contract
   function proxy() view returns (address proxy);

   function set_name(string name);
   function update_record(string name);
   function set_weapon(uint256 id);
   // leave old scene enter new scene
   function set_scene(address scene);
   function set_job(uint8 job);
   
   // call proxy process function
   function process(address _to, uint256 decision);
   
   // call proxy info function
   function info() view returns (string info);
}
```
#### 用户管理
用户的注册合约

## 剧情
```
// info get information about story
// process change state
// for example
// fight: function process fight and save result(no need arg info); function info return board info  
// talk: function info return dialog info; function process set user decision
contract StoryInterface {
   function info(address _from) view returns (string info);

   function process(address _from, address _to, uint256 decision);

   // Events
   event Process(address indexed _from, address indexed _to, string _result);
}
```

## 系统信息
```
contract WorldInfoInterface {
   function scenes() view returns (address[] scene);
   function users(address scene) view returns (address[] users);
   
   function add_scene(address scene);
   function delete_scene(address scene);
   
   function user_enter(address scene, address user);
   function user_leave(address scene, address user);
}
```

## 物品
[interface](http://erc721.org/)
[example](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC721/ERC721Token.sol)
## 金钱
```
contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}
```
[example](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/BasicToken.sol)
