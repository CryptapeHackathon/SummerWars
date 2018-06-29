const mocha = require('mocha');
const util = require('../helpers/util');
const config = require('../config');
const register = require('../helpers/register');
const userOp = require('../helpers/user_op');
const assert = require('assert');

const { getTxReceipt, logger } = util;

const { address } = config.testId;

const {
  updateRecord,
  setWeapon,
  setScene,
  setJob,
  process,
} = userOp;
const { describe, it, before } = mocha;
const { deployReg, userOpAddr, newId } = register;

let addr;
let idAddr;

describe('test user op contract', () => {
  before('should deploy a register contract', (done) => {
    deployReg()
      .then(() => {
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Deploy register contract error:!!!!\n', err);
        this.skip();
      });
  });

  it('should send a newId tx and get receipt', (done) => {
    const res = newId(address);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        idAddr = receipt.logs[0].address;
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get newId receipt err:!!!!\n', err);
        this.skip();
      });
  });


  it('should have the address of user op', () => {
    addr = userOpAddr();
    logger.debug(addr);
    assert.notEqual(addr, 0x0000000000000000000000000000000000000000);
  });

  it('should send a update record tx and get receipt', (done) => {
    const res = updateRecord(1, idAddr, addr);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get updateRecord receipt err:!!!!\n', err);
        this.skip();
      });
  });

  it('should send a set weapon tx and get receipt', (done) => {
    const res = setWeapon(1, idAddr, addr);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get setWeapon receipt err:!!!!\n', err);
        this.skip();
      });
  });

  it('should send a set scene tx and get receipt', (done) => {
    const res = setScene(address, idAddr, addr);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get setScene receipt err:!!!!\n', err);
        this.skip();
      });
  });

  it('should send a set job tx and get receipt', (done) => {
    const res = setJob(address, idAddr, addr);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get setJob receipt err:!!!!\n', err);
        this.skip();
      });
  });

  it('should send a process tx and get receipt', (done) => {
    const res = process(address, 1, idAddr, addr);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get process receipt err:!!!!\n', err);
        this.skip();
      });
  });
});
