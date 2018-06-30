const util = require('./util');
const config = require('../config');

const {
  web3, genTxParams,
} = util;

const { abi } = config.contract.userOp;
const Contract = web3.eth.contract(abi);

// update record
const updateRecord = function updateRecord(record, id, addr) {
  const Ins = Contract.at(addr);
  return Ins.updateRecord.sendTransaction(
    record,
    id,
    genTxParams(),
  );
};

// set weapon
const setWeapon = function setWeapon(weaponId, id, addr) {
  const Ins = Contract.at(addr);
  return Ins.setWeapon.sendTransaction(
    weaponId,
    id,
    genTxParams(),
  );
};

// set scene
const setScene = function setScene(scene, id, addr) {
  const Ins = Contract.at(addr);
  return Ins.setScene.sendTransaction(
    scene,
    id,
    genTxParams(),
  );
};

// set job
const setJob = function setJob(job, id, addr) {
  const Ins = Contract.at(addr);
  return Ins.setJob.sendTransaction(
    job,
    id,
    genTxParams(),
  );
};

// set job
const process = function process(to, decision, id, addr) {
  const Ins = Contract.at(addr);
  return Ins.process.sendTransaction(
    to,
    decision,
    id,
    genTxParams(),
  );
};


module.exports = {
  updateRecord,
  setWeapon,
  setScene,
  setJob,
  process,
}
