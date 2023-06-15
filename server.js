const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT } = process.env;
console.log(typeof DB_HOST);
mongoose.set('strictQuery', true);
mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //  подключение к базе данных

    try {
      app.listen(PORT);
      // подключаем вер-сервер, после того как подключились к базе данных,
      // так как нет смысла в подключении сервера, если у нас ошибка в получение данных с базы данных
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  });
