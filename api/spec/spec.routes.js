const Request = require('request');

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
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body).toBe('Hello World');
    });
  });

/*
  describe('GET /api/v1/orders/:id', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('https://jessam.herokuapp.com/api/v1/orders/1', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
  });


  describe('POST /api/v1/orders', () => {
    const data = {};
    beforeAll((done) => {
      const options = {
        method: 'POST',
        url: 'https://jessam.herokuapp.com/api/v1/orders',
        headers: { 'content-type': 'application/json' },
        body: {
          name: 'Since Morning',
          date: 'Aug 30',
          order: {
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
    it('Status 201', () => {
      expect(data.status).toBe(201);
    });
  });


  describe('PUT /api/v1/orders/:id', () => {
    const data = {};
    beforeAll((done) => {
      Request.put('https://jessam.herokuapp.com/api/v1/orders/1', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
  });


  describe('DELETE /api/v1/orders/:id', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('https://jessam.herokuapp.com/api/v1/orders/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        data.number = data.body.length;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
  });

*/
  describe('GET /api/v1/orders', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('https://jessam.herokuapp.com/api/v1/orders', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        data.number = data.body.length;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
  });
});
