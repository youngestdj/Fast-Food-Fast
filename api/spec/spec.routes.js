const Request = require('request');

const token = process.env.TRAVIS_FFF_TOKEN;

describe('Server', () => {
  describe('GET /', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('https://jessam.herokuapp.com/', (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Default route should return status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Default route should return Hello World', () => {
      expect(data.body).toBe('Hello World');
    });
  });

  describe('POST /api/v1/orders', () => {
    const data = {};
    beforeAll((done) => {
      const options = {
        method: 'POST',
        url: 'https://jessam.herokuapp.com/api/v1/orders',
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        body: {
          userId: '1',
          amount: '1500',
          orderItems: {
            Jollof: '200',
            beans: '100',
            Chicken: '300',
          },
        },
        json: true,
      };
      Request(options, (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('Should return 201 for content created', () => {
      expect(data.status).toBe(201);
    });
  }); 

  describe('GET /api/v1/orders', () => {
    const data = {};
    beforeAll((done) => {
      const options = {
        method: 'GET',
        url: 'https://jessam.herokuapp.com/api/v1/orders',
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        json: true,
      };
      Request(options, (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('Should return 200 for successful request', () => {
      expect(data.status).toBe(200);
    });
  });
});

  describe('GET /api/v1/orders/:id', () => {
    const data = {};
    beforeAll((done) => {
      const options = {
        method: 'GET',
        url: 'https://jessam.herokuapp.com/api/v1/orders/1',
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        json: true,
      };
      Request(options, (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('Should return 200 for successful request', () => {
      expect(data.status).toBe(200);
    });
  });

  describe('PUT /api/v1/orders/:id', () => {
    const data = {};
    beforeAll((done) => {
      const options = {
        method: 'PUT',
        url: 'https://jessam.herokuapp.com/api/v1/orders/1',
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        json: true,
      };
      Request(options, (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('Should return 201 for content created', () => {
      expect(data.status).toBe(200);
    });
  });

  describe('DELETE /api/v1/orders/:id', () => {
    const data = {};
    beforeAll((done) => {
      const options = {
        method: 'DELETE',
        url: 'https://jessam.herokuapp.com/api/v1/orders/1',
        headers: { 'content-type': 'application/json', 'x-access-token': token },
        json: true,
      };
      Request(options, (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('Should return 200 for successful request', () => {
      expect(data.status).toBe(200);
    });
  });
