require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/fitnesstracker', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const workoutRouter = require('./routes/workouts');
app.use('/workouts', workoutRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});