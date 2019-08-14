const initContactsPost = require('./contacts-post');
const initContactsGet = require('./contacts-get');

const initContactsIDPut = require('./contacts-id-put');
const initContactsIDGet = require('./contacts-id-get');
const initContactsIDDelete = require('./contacts-id-delete');

const initRoutes = (server) => {
  initContactsPost(server);
  initContactsGet(server);

  initContactsIDPut(server);
  initContactsIDGet(server);
  initContactsIDDelete(server);
};

module.exports = initRoutes;
