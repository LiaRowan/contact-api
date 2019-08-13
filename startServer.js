/* eslint-disable no-console,global-require */

const Hapi = require('@hapi/hapi');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
  silent: true,
});

startServer()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

async function startServer() {
  const server = Hapi.server({
    address: process.env.ADDRESS,
    port: process.env.PORT,
  });

  const plugins = [{
    plugin: require('@hapi/good'),
    options: {
      ops: {
        interval: 60000,
      },
      reporters: {
        consoleReporter: [{
          module: '@hapi/good-console',
        }, 'stdout'],
      },
    },
  }, {
    plugin: require('./src'),
    options: {
      databaseFile: path.join(__dirname, process.env.DATABASE_FILEPATH),
    },
  }];

  await server.register(plugins);
  await server.start();
}
