const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

router.get('/', async (req, res, next) => {
  try {
    res.render('login');
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;

// login using username and password (not working/ workin on)
function login(req, res) {
	db.collection('users').findOne({
		username: req.body.username,
		password: req.body.password
	}).then(data => {
    console.log(data)
		res.render('profile', {users: data})
	})
}

router.post('/', login)