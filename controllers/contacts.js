const contacts = require('../models/contacts');
const HttpError = require('../helpers/HttpError');
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing required name field');
    }
    const { name, email, phone } = value;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json('contact deleted');
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing fields');
    }
    const { id } = req.params;
    const body = req.body;

    const result = await contacts.updateContact(id, body);
    if (!result) {
      throw HttpError(404, `'message': 'Not found'`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
};
