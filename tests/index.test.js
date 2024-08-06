import Hapi from '@hapi/hapi';

import API from '../src/index';

describe('Hapi Plugin', () => {
  let server;

  beforeEach(() => {
    server = Hapi.Server();
  });

  it('registers successfully with a hapi server', async () => {
    const registration = server.register({
      plugin: API,
      options: {},
    });

    await expect(registration).resolves.toBe(undefined);
  });

  it('starts successfully with a hapi server', async () => {
    await server.register({
      plugin: API,
      options: {},
    });

    await expect(server.start()).resolves.toBe(undefined);
    server.stop();
  });
});
