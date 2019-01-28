'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../../server');

chai.use(chaiHttp);

describe('Health - IT', () => {

  describe('GET /health', () => {

    it('provides health status', (done) => {
      chai.request(server)
        .get('/health')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({ status: 'UP' });
          done();
        });
    });

  });

});
