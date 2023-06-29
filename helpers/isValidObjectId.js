const { isValidObjectId } = require('mongoose');
const HttpError = require('./HttpError');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id}id is not valid id`));
  }
  next();
};
// middleware проверят id на валидность, если этот id не является ObjectId, то даже не заходит в базу,
// то есть проверяет не наличие данного id в базе, а соответствует ли параметр id в целом
module.exports = isValidId;
