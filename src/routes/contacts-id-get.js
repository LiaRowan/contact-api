const initRoute = (server) => {
  server.route({
    path: '/contacts/{id}',
    method: 'GET',

    async handler(req, h) {
      const db = await server.methods.db();
      const contact = await db.getContact(req.params.id);

      return (contact)
        ? h.response(contact).code(200)
        : h.response().code(404);
    },
  });
};

module.exports = initRoute;
