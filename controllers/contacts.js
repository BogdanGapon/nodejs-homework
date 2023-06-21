const { HttpError } = require('../helpers/');
// const Joi = require('joi');
const { Contact } = require('../models/contact');
const { schemaContact } = require('../models/contact');
const { schemaFavorite } = require('../models/contact');

// const schemaContact = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });
const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    console.log(result);
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
    const { error } = schemaContact.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing required name field');
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
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
    const { error } = schemaContact.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing fields');
    }
    const { id } = req.params;
    const body = req.body;

    const result = await Contact.findByIdAndUpdate(id, body, {
      new: true,
      select: '-updatedAt',
    });
    if (!result) {
      throw HttpError(404, `message: Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(body);

    const { error } = schemaFavorite.validate(body);
    console.log(error);
    if (error) {
      throw HttpError(400, `message: missing field favorite`);
    }
    const result = await Contact.findByIdAndUpdate(id, body, { new: true });
    console.log(result);
    if (!result) {
      HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
