const express = require('express');
const router = express.Router();
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

router.get('/liking', async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
    console.log(user);
    res.render('test');
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;