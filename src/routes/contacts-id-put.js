const schemas = require('../db/schemas');

const initRoute = (server) => {
  server.route({
    path: '/contacts/{id}',
    method: 'PUT',

    options: {
      validate: {
        payload: schemas.contactRequest,
      },
    },

    async handler(req, h) {
      const db = await server.methods.db();
      const wasReplaced = await db.updateContact(req.params.id, req.payload);

      return (wasReplaced)
        ? h.response().code(200)
        : h.response().code(404);
    },
  });
};

module.exports = initRoute;
