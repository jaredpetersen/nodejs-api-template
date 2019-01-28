'use strict';

const chai = require('chai');
const expect = chai.expect;
const server = require('../../server');

describe('Errors - IT', () => {

  describe('null route', () => {

    it('returns a 404 response', (done) => {
      chai.request(server)
        .get('/nonexistentroute')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('not found');
          done();
        });
    });

  });

});
