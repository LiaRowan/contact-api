import Hapi from '@hapi/hapi';
import NeDB from 'nedb';

import API from '../../src';
import contacts from '../__data__/contactPayloads';
import DBApi from '../../src/db/api';

describe('DELETE /contacts/{id}', () => {
  const url = (id) => `/contacts/${id}`;
  const method = 'DELETE';

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

  it('replies 404 NotFound if ID not in database', async () => {
    const res = await server.inject({ url: url(9001), method });

    expect(res.statusCode).toBe(404);
    expect(res.statusMessage).toBe('Not Found');
  });

  it('replies 200 OK for valid ID', async () => {
    await server.inject({ url: '/contacts', method: 'POST', payload: contacts.new });

    const res = await server.inject({ url: url(0), method });

    expect(res.statusCode).toBe(200);
    expect(res.statusMessage).toEqual('OK');
  });

  it('removes the contact from the database', async () => {
    await server.inject({ url: '/contacts', method: 'POST', payload: contacts.new });
    await server.inject({ url: url(0), method });

    const res = await new Promise((resolve, reject) => {
      db.findOne({ _id: 0 }, (err, result) => {
        if (err) { return reject(err); }

        return resolve(result);
      });
    });

    expect(res).toEqual(null);
  });
});
