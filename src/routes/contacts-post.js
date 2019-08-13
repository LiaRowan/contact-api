const schemas = require('../db/schemas');

const initRoute = (server) => {
  server.route({
    path: '/contacts',
    method: 'POST',

    options: {
      validate: {
        payload: schemas.contactRequest,
      },
    },

    async handler(req, h) {
      const db = await server.methods.db();

      const newDoc = await db.addContact(req.payload);
      return h.response({ id: newDoc.id }).code(201);
    },
  });
};

module.exports = initRoute;
