const Joi = require('@hapi/joi');

const contactRequest = Joi.object({
  email: Joi.string().required(),

  name: Joi.object({
    first: Joi.string().required(),
    middle: Joi.string().required(),
    last: Joi.string().required(),
  }).required(),

  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
  }).required(),

  phone: Joi.array().items(Joi.object({
    number: Joi.string().required(),
    type: Joi.string().valid('home', 'work', 'mobile').required(),
  })).required(),
});

const contact = contactRequest.keys({
  id: Joi.number().required(),
});

module.exports = {
  contact,
  contactRequest,
};
