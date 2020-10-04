const express = require('express');
/* const logger = require('morgan'); */
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;

/* app.use(logger('dev')); */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//
mongoose.set('toJSON', { virtuals: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(require('./routes/api.js'));
app.use(require('./routes/routes.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});