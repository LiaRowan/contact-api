const pkg = require('../package.json');

module.exports = {
  pkg,

  async register(server) {
    server.log(['contact-api'], `server running at: ${server.info.uri}`);
  },
};
