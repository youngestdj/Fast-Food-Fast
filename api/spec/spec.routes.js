const request = require('supertest');
const server = require('../../server.js');
let app = server.app;

const token = process.env.TRAVIS_FFF_TOKEN;

describe('Server', () => {
  describe('GET /', () => {
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Default route should return status 200', async () => {
      await request(app1)
        .get('/')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe('Hello World');
        })
    });
  });

  describe('POST /api/v1/orders', () => {
      const data = {
        userId: '1',
        amount: '1500',
        orderItems: {
          Puff: '200',
          Rice: '100',
          Chicken: '300',
          }
        };
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 201 for content created', async () => {
      await request(app1)
        .post('/api/v1/orders')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        })
    });
    it('Should return 400 for invalid data', async () => {
      await request(app1)
        .post('/api/v1/orders')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(400);
        })
    });
    });

  describe('GET /api/v1/orders', () => {
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 200 for successful request', async () => {
      await request(app1)
        .get('/api/v1/orders')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        })
    });
  });

  describe('GET /api/v1/orders/:id', () => {
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 200 for successful request', async () => {
      await request(app1)
        .get('/api/v1/orders/1')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        })
    });
    it('Should return 404 for order not found', async () => {
      await request(app1)
        .get('/api/v1/orders/222')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });

describe('GET /api/v1/users/:userid/orders', () => {
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 200 for successful request', async () => {
      await request(app1)
        .get('/api/v1/users/1/orders')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        })
    });
    it('Should return 200 for order not found', async () => {
      await request(app1)
        .get('/api/v1/users/2/orders')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });

  describe('PUT /api/v1/orders/:id', () => {
      const data = {
        amount: '700',
        orderItems: {
          Buns: '200',
          Egg: '100',
          Chicken: '300',
          }
        };
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 201 for content created', async () => {
      await request(app1)
        .put('/api/v1/orders/1')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        })
    });
    it('Should return 404 for order not found', async () => {
      await request(app1)
        .put('/api/v1/orders/222')
        .send(data)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        })
    });
    });
/*
  describe('DELETE /api/v1/orders/:id', () => {
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 200 for successful delete', async () => {
      await request(app1)
        .delete('/api/v1/orders/26')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        })
    });
    it('Should return 404 for order not found', async () => {
      await request(app1)
        .delete('/api/v1/orders/1')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(404);
        })
    });
  });
*/

  describe('POST /api/v1/auth/login', () => {
      const correctLogin = {
        email: 'jessam@joyson.com',
        password: 'abcdef',
      };
      const incorrectEmail = {
        email: 'steveww@joyson.com',
        password: 'abcdef',
      };
      const incorrectPassword = {
        email: 'jessam@joyson.com',
        password: 'abcddef',
      };
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 200 for successful login', async () => {
      await request(app1)
        .post('/api/v1/auth/login')
        .send(correctLogin)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('Should return 422 for invalid email', async () => {
      await request(app1)
        .post('/api/v1/auth/login')
        .send(incorrectEmail)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        })
    });
    it('Should return 422 for invalid password', async () => {
      await request(app1)
        .post('/api/v1/auth/login')
        .send(incorrectPassword)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        })
    });
    });

  describe('POST /api/v1/menu', () => {
      const newMenu = {
        food: 'newfood2',
        price: '50',
        quantifier: 'wrap'
      };
      const existingMenu = {
        food: 'Fufu',
        price: '50',
        quantifier: 'wrap'
      };

    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 201 for content created', async () => {
      await request(app1)
        .post('/api/v1/menu')
        .send(newMenu)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        })
    });
    it('Should return 422 for food already exists', async () => {
      await request(app1)
        .post('/api/v1/menu')
        .send(existingMenu)
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        })
    });
    it('Should return 422 for invalid data', async () => {
      await request(app1)
        .post('/api/v1/menu')
        .send()
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        })
    });
    });

  describe('GET /api/v1/menu', () => {
    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 200 for successful request', async () => {
      await request(app1)
        .get('/api/v1/menu')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .expect((res) => {
          expect(res.statusCode).toBe(200);
        })
    });
  });

  describe('POST /api/v1/auth/signup', () => {
      const correctData = {
        email: 'test9@1ocalhost.com',
        firstname: 'Test',
        lastname: 'localhost',
        password: 'abcdef'
      };
      const existingData = {
        email: 'jessam@joyson.com',
        firstname: 'Test',
        lastname: 'localhost',
        password: 'abcdef'
      };
      const invalidEmail = {
        email: 'nwrjgnrjw',
        firstname: 'Test',
        lastname: 'localhost',
        password: 'abcdef'
      };

    const app1 = app.listen();
    afterAll(() => {
        app1.close();
    });

    it('Should return 201 for content created', async () => {
      await request(app1)
        .post('/api/v1/auth/signup')
        .send(correctData)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(201);
        })
    });
    
    it('Should return 409 for user already exists', async () => {
      await request(app1)
        .post('/api/v1/auth/signup')
        .send(existingData)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(409);
        })
    });
    it('Should return 422 for invalid email', async () => {
      await request(app1)
        .post('/api/v1/auth/signup')
        .send(invalidEmail)
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        })
    });
    it('Should return 422 for invalid data', async () => {
      await request(app1)
        .post('/api/v1/auth/signup')
        .send({})
        .set('content-type', 'application/json')
        .expect((res) => {
          expect(res.statusCode).toBe(422);
        })
    }); 
    });

});
