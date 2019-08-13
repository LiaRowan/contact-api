const initContactsPost = require('./contacts-post');

const initRoutes = (server) => {
  initContactsPost(server);
};

module.exports = initRoutes;
