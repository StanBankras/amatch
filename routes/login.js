const express = require('express');
const router = express.Router();
const slug = require('../helpers/slug');
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

// Load users that are able to login
router.get('/login', async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.render('pages/likingLogin', { users: users });
  } catch(err) {
    console.error(err);
  }
});

// Post route for login
router.post('/login-as', (req, res) => {
  // Setting the session user to the selected user on login
  req.session.user = slug(req.body.user);
  res.redirect('/matches');
});

// Post route for logging out
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;