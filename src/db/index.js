const NeDB = require('nedb');

const DBApi = require('./api');

const initDB = async (server, options) => {
  const db = new NeDB({ filename: options.databaseFile, autoload: true });
  const dbApi = new DBApi(db);

  server.method('db', async () => dbApi);
};

module.exports = initDB;
