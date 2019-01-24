'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const health = require('./index');

describe('Health - UT', () => {

  describe('status()', () => {

    it('provides health status', (done) => {
      // Stub req
      const reqStub = null;

      // Mock res
      const resMock = {};
      resMock.status = (statusCode) => {
        expect(statusCode).to.equal(200);
        return resMock;
      };
      resMock.json = (json) => {
        expect(json).to.deep.equal({ status: 'UP' });
        done();
      };

      // Stub next
      const nextStub = null;

      // Run unit under test
      health.status(reqStub, resMock, nextStub);
    });
  });

});
