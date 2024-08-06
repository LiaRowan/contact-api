const initContactsPost = require('./contacts-post');
const initContactsGet = require('./contacts-get');

const initContactsIDPut = require('./contacts-id-put');
const initContactsIDGet = require('./contacts-id-get');

const initRoutes = (server) => {
  initContactsPost(server);
  initContactsGet(server);

  initContactsIDPut(server);
  initContactsIDGet(server);
};

module.exports = initRoutes;
