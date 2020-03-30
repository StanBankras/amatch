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

router.get('/profile', async (req, res, next) => {
  try {
    const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
    console.log(user);
    res.render('profile');
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;

router.get('/detail/:id/', async (req, res, next) => {
	try {
		const profile = await db.collection('users').findOne({ _id: mongo.ObjectID(req.params.id) })	
		res.render('profile.ejs', {users: profile})
	} catch(err) {
		console.log(err)
	}
})