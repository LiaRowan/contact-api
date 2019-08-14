const initContactsPost = require('./contacts-post');
const initContactsGet = require('./contacts-get');

const initContactsIDPut = require('./contacts-id-put');

const initRoutes = (server) => {
  initContactsPost(server);
  initContactsGet(server);

  initContactsIDPut(server);
};

module.exports = initRoutes;
