'use strict';

var Request = require('request');

describe('Server', function () {
  describe('GET /', function () {
    var data = {};
    beforeAll(function (done) {
      Request.get('https://jessam.herokuapp.com/', function (error, response, body) {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', function () {
      expect(data.status).toBe(200);
    });
    it('Body', function () {
      expect(data.body).toBe('Hello World');
    });
  });

  describe('GET /api/v1/orders/:id', function () {
    var data = {};
    beforeAll(function (done) {
      Request.get('https://jessam.herokuapp.com/api/v1/orders/1', function (error, response) {
        data.status = response.statusCode;
        done();
      });
    });
    it('Status 200', function () {
      expect(data.status).toBe(200);
    });
  });

  describe('POST /api/v1/orders', function () {
    var data = {};
    beforeAll(function (done) {
      var options = {
        method: 'POST',
        url: 'https://jessam.herokuapp.com/api/v1/orders',
        headers: { 'content-type': 'application/json' },
        body: {
          name: 'Since Morning',
          date: 'Aug 30',
          order: {
            Jollof: '200',
            beans: '100',
            Chicken: '300'
          }
        },
        json: true
      };
      Request(options, function (error, response) {
        data.status = response.statusCode;
        done();
      });
    });
    it('Status 201', function () {
      expect(data.status).toBe(201);
    });
  });

  describe('PUT /api/v1/orders/:id', function () {
    var data = {};
    beforeAll(function (done) {
      Request.put('https://jessam.herokuapp.com/api/v1/orders/1', function (error, response) {
        data.status = response.statusCode;
        done();
      });
    });
    it('Status 200', function () {
      expect(data.status).toBe(200);
    });
  });

  describe('DELETE /api/v1/orders/:id', function () {
    var data = {};
    beforeAll(function (done) {
      Request.get('https://jessam.herokuapp.com/api/v1/orders/1', function (error, response, body) {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        data.number = data.body.length;
        done();
      });
    });
    it('Status 200', function () {
      expect(data.status).toBe(200);
    });
  });

  describe('GET /api/v1/orders', function () {
    var data = {};
    beforeAll(function (done) {
      Request.get('https://jessam.herokuapp.com/api/v1/orders', function (error, response, body) {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        data.number = data.body.length;
        done();
      });
    });
    it('Status 200', function () {
      expect(data.status).toBe(200);
    });
    it('It should return three Items', function () {
      expect(data.number).toBe(4);
    });
  });
});