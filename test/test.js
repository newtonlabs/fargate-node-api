'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../server.js'); // Our app

describe('API endpoint /hello', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - List all colors
  it('Return a basic payload', function() {
    return chai.request(app)
      .get('/hello')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });
});
