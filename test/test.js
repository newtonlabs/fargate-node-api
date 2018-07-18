'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));
const app = require('../server.js');

describe('API endpoint /api/hello', function() {
  this.timeout(5000);

  before(function() {});
  after(function() {});

  it('Return a basic payload', function() {
    return chai.request(app)
      .get('/api/hello')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });
});
