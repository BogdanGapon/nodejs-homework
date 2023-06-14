const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const { DB_HOST, HOST = 3000 } = process.env;

mongoose.connect(DB_HOST).then(() => {
  //  подключение к базе данных

  try {
    app.listen(HOST);
    // подключаем вер-сервер, после того как подключились к базе данных,
    // так как нет смысла в подключении сервера, если у нас ошибка в получение данных с базы данных
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
});
