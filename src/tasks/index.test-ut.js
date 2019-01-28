'use strict';

const chai = require('chai');
const expect = chai.expect;
const tasks = require('./index');

describe('Tasks - UT', () => {

  describe('findAll()', () => {

    it('lists all tasks', (done) => {
      // Stub req
      const reqStub = null;

      // Mock res
      const resMock = {};
      resMock.status = (statusCode) => {
        expect(statusCode).to.equal(200);
        return resMock.status;
      };
      resMock.status.json = (json) => {
        const expectedTasks = [
          {'_id': 1, 'name': 'milk'},
          {'_id': 2, 'name': 'cheese'},
          {'_id': 3, 'name': 'milk'}
        ];

        expect(json).to.deep.equal(expectedTasks);
        done();
      };

      // Stub next
      const nextStub = null;

      // Run unit under test
      tasks.findAll(reqStub, resMock, nextStub);
    });
  });

  describe('buggyRoute()', () => {

    it('passes an error along', (done) => {
      // Stub req
      const reqStub = null;

      // Stub res
      const resStub = null;

      // Mock next
      const nextMock = (err) => {
        expect(err.status).to.equal(400)
        expect(err.message).to.equal('bad request');
        done();
      };

      // Run unit under test
      tasks.buggyRoute(reqStub, resStub, nextMock);
    });

  });

});
