var expect = require('chai').expect;
var should = require('chai').should;
var supertest = require('supertest');
var config = require('../config');
var api = supertest('http://localhost:' + config.apiPort);

describe('Users', function(){
    it('Lists all users', function(done){
        api.get('/users')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            // Overall
            expect(res.body).to.be.a('Array');
            // When there are users
            if (res.body.length > 0) {
                // User ID
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]._id).to.not.equal(null);
                expect(res.body[0]._id).to.be.a('String');
                // Email
                expect(res.body[0]).to.have.property('email');
                expect(res.body[0].email).to.not.equal(null);
                expect(res.body[0].email).to.be.a('String');
                // First Name
                expect(res.body[0]).to.have.property('first_name');
                expect(res.body[0].first_name).to.not.equal(null);
                expect(res.body[0].first_name).to.be.a('String');
                // Last Name
                expect(res.body[0]).to.have.property('last_name');
                expect(res.body[0].last_name).to.not.equal(null);
                expect(res.body[0].last_name).to.be.a('String');
                // Created
                expect(res.body[0]).to.have.property('created');
                expect(res.body[0].created).to.not.equal(null);
                expect(res.body[0].created).to.be.a('String');
            }
            done();
        });
    });

    it('Gets a single user', function(done){
        api.get('/users/55eba36104c672fd0d91523c')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            // Overall
            expect(res.body).to.be.a('Object');
            // User ID
            expect(res.body).to.have.property('_id');
            expect(res.body._id).to.not.equal(null);
            expect(res.body._id).to.be.a('String');
            // Email
            expect(res.body).to.have.property('email');
            expect(res.body.email).to.not.equal(null);
            expect(res.body.email).to.be.a('String');
            // First Name
            expect(res.body).to.have.property('first_name');
            expect(res.body.first_name).to.not.equal(null);
            expect(res.body.first_name).to.be.a('String');
            // Last Name
            expect(res.body).to.have.property('last_name');
            expect(res.body.last_name).to.not.equal(null);
            expect(res.body.last_name).to.be.a('String');
            // Password
            expect(res.body).to.have.property('password');
            expect(res.body.password).to.not.equal(null);
            expect(res.body.password).to.be.a('String');
            // Created
            expect(res.body).to.have.property('created');
            expect(res.body.created).to.not.equal(null);
            expect(res.body.created).to.be.a('String');
            done();
        });
    });

    it('Gets a single (nonexistent) user', function(done){
        api.get('/users/0')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
            // Overall
            expect(res.body).to.be.a('Object');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).to.be.a('String');
            expect(res.body.message).to.equal('Not Found');
            done();
        });
    });

    it('Creates a new user');

    it('Updates a user');

    it('Deletes a user');
});
