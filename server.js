require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Add to schema dynamically (for the total exercise duration)
mongoose.set('toJSON', { virtuals: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

//Routes
app.use(require('./routes/api.js'));
app.use(require('./routes/routes.js'));

//Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});