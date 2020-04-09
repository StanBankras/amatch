const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
	db = database
});

router.get('/dashboard', auth, (req, res) => {
  console.log(db);
  res.render('pages/dashboard');
});

module.exports = router;