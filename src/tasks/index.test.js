'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../server');

chai.use(chaiHttp);

describe('Tasks', () => {

  describe('GET /tasks', () => {
    it('lists all tasks', (done) => {
      chai.request(server)
        .get('/tasks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          done();
        });
    });
  });

  describe('POST /tasks', () => {
    it('returns an error', (done) => {
      chai.request(server)
        .post('/tasks')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.equal('bad request');
          done();
        });
    });
  });

});
