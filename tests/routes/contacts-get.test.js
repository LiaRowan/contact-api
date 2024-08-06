import Hapi from '@hapi/hapi';
import NeDB from 'nedb';

import API from '../../src';
import contacts from '../__data__/contactPayloads';
import DBApi from '../../src/db/api';

describe('GET /contacts', () => {
  const url = '/contacts';
  const method = 'GET';

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

  it('replies 200 with json contact data', async () => {
    const expected = [
      { ...contacts.new, id: 0 },
      { ...contacts.new, id: 1 },
    ];

    await server.inject({ url: '/contacts', method: 'POST', payload: contacts.new });
    await server.inject({ url: '/contacts', method: 'POST', payload: contacts.new });

    const res = await server.inject({ url, method });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual(expected);
  });
});
