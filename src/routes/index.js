const initContactsPost = require('./contacts-post');
const initContactsGet = require('./contacts-get');

const initRoutes = (server) => {
  initContactsPost(server);
  initContactsGet(server);
};

module.exports = initRoutes;
