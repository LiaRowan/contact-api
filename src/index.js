const pkg = require('../package.json');
const initDB = require('./db');
const initRoutes = require('./routes');

module.exports = {
  pkg,

  async register(server, options) {
    server.log(['contact-api'], `server running at: ${server.info.uri}`);

    initDB(server, options);
    initRoutes(server);
  },
};
