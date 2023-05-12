
router.get('/', async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
  // Authentication successful
  res.json({ message: 'Login successful' });
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  req.logout(); // Passport method to logout
  res.json({ message: 'Logout successful' });
});

module.exports = router;
