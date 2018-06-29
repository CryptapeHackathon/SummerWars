const util = require('./util');
const config = require('../config');

const {
  web3, logger, genTxParams, getTxReceipt,
} = util;

const { abi, bytecode } = config.contract.register;
const Contract = web3.eth.contract(abi);

let contAddr;

const deployReg = function deployReg() {
  return new Promise((resolve, reject) => {
    Contract.new({ ...genTxParams(), data: bytecode }, (err, contract) => {
      if (err) reject(err);

      if (contract.address) {
        logger.info('Register address: ', contract.address);
        logger.debug('Deploy contract tx hash: ', contract.transactionHash);

        getTxReceipt(contract.transactionHash)
          .then((receipt) => {
            logger.info('\nGet tx receipt:\n', receipt);
            logger.debug('\n Topic of deploy register logs:\n', JSON.stringify(receipt.logs[0].topics));
          })
          .catch((e) => {
            logger.error('\n!!!!Get tx receipt err:!!!!\n', e);
          });
        contAddr = contract.address;
        resolve(contract.address);
      }
    });
  });
};

// New id
const newId = function newId(id, addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.newId.sendTransaction(
    id,
    genTxParams(),
  );
};

// New scene
const newScene = function newScene(owner, name, proxy, addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.newScene.sendTransaction(
    owner,
    name,
    proxy,
    genTxParams(),
  );
};

// Init scene
const initScene = function initScene(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.init_scenes.sendTransaction(genTxParams());
};

// Query user op address
const userOpAddr = function userOpAddr(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.userOpAddr.call();
};

// Query scene op address
const sceneOpAddr = function sceneOpAddr(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.sceneOpAddr.call();
};

// Query world info address
const worldInfoAddr = function worldInfoAddr(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.worldInfoAddr.call();
};

// Query fight story address
const fightStoryAddr = function fightStoryAddr(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.fightStoryAddr.call();
};

// Query first story address
const firstStoryAddr = function firstStoryAddr(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.firstStoryAddr.call();
};

// Query first address
const firstAddr = function firstAddr(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.firstAddr.call();
};

// Query fight address
const fightAddr = function fightAddr(addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.fightAddr.call();
};

// Query id address
const idAddr = function idAddr(id, addr = contAddr) {
  const Ins = Contract.at(addr);
  return Ins.idAddr.call(id);
};

module.exports = {
  deployReg,
  newId,
  newScene,
  initScene,
  userOpAddr,
  sceneOpAddr,
  worldInfoAddr,
  fightStoryAddr,
  firstStoryAddr,
  firstAddr,
  fightAddr,
  idAddr,
};
