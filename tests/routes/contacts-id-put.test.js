import Hapi from '@hapi/hapi';
import NeDB from 'nedb';

import API from '../../src';
import contacts from '../__data__/contactPayloads';
import DBApi from '../../src/db/api';

describe('PUT /contacts/{id}', () => {
  const url = (id) => `/contacts/${id}`;
  const method = 'PUT';

  let server;
  let db;

  beforeEach(async () => {
    server = Hapi.Server();
    await server.register({
      plugin: API,
      options: {},
    });
    await server.start();

    db = new NeDB({ autoload: true });
    const dbApi = new DBApi(db);

    // Mock the database calls
    server.methods.db = async () => dbApi;
  });

  afterEach(async () => {
    await server.stop();
  });

  it('replies 400 for invalid payload', async () => {
    const res = await server.inject({ url: url(0), method, payload: {} });

    expect(res.statusCode).toBe(400);
  });

  it('replies 404 Not Found for non-existant ID', async () => {
    const res = await server.inject({ url: url(9001), method, payload: contacts.update });

    expect(res.statusCode).toBe(404);
    expect(res.statusMessage).toBe('Not Found');
  });

  it('replies 200 OK for valid payloads', async () => {
    await server.inject({ url: '/contacts', method: 'POST', payload: contacts.new });

    const res = await server.inject({ url: url(0), method, payload: contacts.update });

    expect(res.statusCode).toBe(200);
    expect(res.statusMessage).toBe('OK');
  });

  it('updates the contact in the database', async () => {
    await server.inject({ url: '/contacts', method: 'POST', payload: contacts.new });
    await server.inject({ url: url(0), method, payload: contacts.update });

    const result = new Promise((resolve, reject) => {
      db.findOne({ _id: 0 }, (err, results) => {
        if (err) { return reject(err); }
        return resolve(results);
      });
    });

    await expect(result).resolves.toEqual({ ...contacts.update, _id: 0 });
  });
});
