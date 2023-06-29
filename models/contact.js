const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const regExp = /\(\d\d\d\)-\d\d-\d\d\d\d/i;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: regExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post('save', handleMongooseError);
// вешает ошибку на случай нарушение валидации СхемыМангуса, так как мангус не присвивает номер ошибки в случае ошибки нужно прокинуть
// правильную ошибку,так как по умолчанию стоит 500 ошибка

const Contact = model('contact', contactSchema);

const schemaContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required().regex(regExp),
  favorite: Joi.boolean(),
});

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  schemaContact,
  schemaFavorite,
  Contact,
};
