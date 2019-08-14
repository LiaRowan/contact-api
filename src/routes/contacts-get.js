const initRoute = (server) => {
  server.route({
    path: '/contacts',
    method: 'GET',

    async handler() {
      const db = await server.methods.db();

      return db.getAllContacts();
    },
  });
};

module.exports = initRoute;
