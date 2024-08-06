const initRoute = (server) => {
  server.route({
    path: '/contacts/{id}',
    method: 'DELETE',

    async handler(req, h) {
      const db = await server.methods.db();
      const wasDeleted = await db.deleteContact(req.params.id);

      return (wasDeleted)
        ? h.response().code(200)
        : h.response().code(404);
    },
  });
};

module.exports = initRoute;
