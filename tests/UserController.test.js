import app from '../index.js';
import request from 'supertest';

describe('Different situations saving users in the database', () => {
  test('This will create a new object', async () => {
    // Preparar datos de prueba
    const data = {
        id: 's', 
        name: 's',
        lastname: 's', 
        username: 's', 
        email: 's@gmail.com', 
        password: 's', 
        role: 'admin',
        state: 'A'
    };

    // Llamar a la función de create
    const response = await request(app)
    .post('/cut-citas/users')
    .send(data);
    const responseBody = response.body.data;

    expect(response.status).toBe(200);
    expect(responseBody.id).toEqual('s');
  });

  test('This will return a 409 status because there is an object with the same id', async () => {
    // Preparar datos de prueba
    const data = {
        id: 's', 
        name: 'v',
        lastname: 'v', 
        username: 'v', 
        email: 'v@gmail.com', 
        password: 'v', 
        role: 'admin',
        state: 'A'
    };

    // Llamar a la función de create
    const response = await request(app)
    .post('/cut-citas/users')
    .send(data);
    const responseBody = response.body;

    expect(response.status).toBe(409);
    expect(responseBody.message).toEqual('idError');
  });

  test('This will return a 409 status because there is an object with the same username', async () => {
    // Preparar datos de prueba
    const data = {
        id: 'v', 
        name: 'v',
        lastname: 'v', 
        username: 's', 
        email: 'v@gmail.com', 
        password: 'v', 
        role: 'admin',
        state: 'A'
    };

    // Llamar a la función de create
    const response = await request(app)
    .post('/cut-citas/users')
    .send(data);
    const responseBody = response.body;

    expect(response.status).toBe(409);
    expect(responseBody.message).toEqual('usernameError');
  });

  test('This will return a 409 status because there is an object with the same email', async () => {
    // Preparar datos de prueba
    const data = {
        id: 'v', 
        name: 'v',
        lastname: 'v', 
        username: 'v', 
        email: 's@gmail.com', 
        password: 'v', 
        role: 'admin',
        state: 'A'
    };

    // Llamar a la función de create
    const response = await request(app)
    .post('/cut-citas/users')
    .send(data);
    const responseBody = response.body;

    expect(response.status).toBe(409);
    expect(responseBody.message).toEqual('emailError');
  });
});

describe('Getting all users in th database', () => {
  test('This will get all users', async () => {
    const response = await request(app).
    get('/cut-citas/users');

    expect(response.status).toBe(200);
  });
});

