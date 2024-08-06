import Hapi from '@hapi/hapi';
import NeDB from 'nedb';

import API from '../../src';
import contacts from '../__data__/contactPayloads';
import DBApi from '../../src/db/api';

describe('POST /contacts', () => {
  const url = '/contacts';
  const method = 'POST';

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
    const res = await server.inject({ url, method, payload: {} });

    expect(res.statusCode).toBe(400);
  });

  it('replies 201 Created for valid payloads', async () => {
    const res = await server.inject({ url, method, payload: contacts.new });

    expect(res.statusCode).toBe(201);
    expect(res.statusMessage).toBe('Created');
  });

  it('replies with id json data for valid payloads', async () => {
    const res0 = await server.inject({ url, method, payload: contacts.new });
    const res1 = await server.inject({ url, method, payload: contacts.new });

    expect(JSON.parse(res0.payload)).toEqual({ id: 0 });
    expect(JSON.parse(res1.payload)).toEqual({ id: 1 });
  });

  it('saves the contact into the database', async () => {
    await server.inject({ url, method, payload: contacts.new });
    await server.inject({ url, method, payload: contacts.new });

    const result0 = new Promise((resolve, reject) => {
      db.findOne({ _id: 0 }, (err, results) => {
        if (err) { return reject(err); }
        return resolve(results);
      });
    });
    const result1 = new Promise((resolve, reject) => {
      db.findOne({ _id: 1 }, (err, results) => {
        if (err) { return reject(err); }
        return resolve(results);
      });
    });

    await expect(result0).resolves.toEqual({ ...contacts.new, _id: 0 });
    await expect(result1).resolves.toEqual({ ...contacts.new, _id: 1 });
  });
});
