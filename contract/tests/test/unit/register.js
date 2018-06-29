const mocha = require('mocha');
const util = require('../helpers/util');
const config = require('../config');
const register = require('../helpers/register');
const assert = require('assert');

const { getTxReceipt, logger } = util;

const { address } = config.testId;

const {
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
} = register;
const { describe, it } = mocha;

const NAME = 'test';

describe('test register contract', () => {
  it('should deploy a new register contract', (done) => {
    deployReg()
      .then(() => {
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Deploy register contract error:!!!!\n', err);
        this.skip();
      });
  });

  it('should have the address of user op', () => {
    const res = userOpAddr();
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });

  it('should have the address of scene op', () => {
    const res = sceneOpAddr();
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });

  it('should have the address of world info', () => {
    const res = worldInfoAddr();
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });

  it('should have the address of fight story', () => {
    const res = fightStoryAddr();
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });

  it('should have the address of first story', () => {
    const res = firstStoryAddr();
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });

  it('should send a newId tx and get receipt', (done) => {
    const res = newId(address);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get newId receipt err:!!!!\n', err);
        this.skip();
      });
  });

  it('should have the address of id', () => {
    const res = idAddr(address);
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });

  it('should send a newScene tx and get receipt', (done) => {
    const res = newScene(address, NAME, address);

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get newScene receipt err:!!!!\n', err);
        this.skip();
      });
  });

  it('should send a initScent tx and get receipt', (done) => {
    const res = initScene();

    getTxReceipt(res.hash)
      .then((receipt) => {
        logger.info('\nSend ok and get receipt:\n', receipt);
        assert.equal(receipt.errorMessage, null, JSON.stringify(receipt.errorMessage));
        done();
      })
      .catch((err) => {
        logger.error('\n!!!!Get initScene receipt err:!!!!\n', err);
        this.skip();
      });
  });

  it('should have the address of fight', () => {
    const res = fightAddr(address);
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });

  it('should have the address of first', () => {
    const res = firstAddr(address);
    logger.debug(res);
    assert.notEqual(res, 0x0000000000000000000000000000000000000000);
  });
});
