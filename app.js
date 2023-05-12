const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const users = require('./routes/users'); 

const app = express();


// Load User model
require('./models/User');

// Passport config
require('./config/passport')(passport);

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// Routes
app.use('/users', users);

app.get('/', (req, res) => res.send('Welcome'));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Example protected route
app.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
