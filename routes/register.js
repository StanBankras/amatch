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

router.get('/register', async (req, res, next) => {
  try {
    const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
    res.render('register');
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;

// add data to DB
function add(req, res, next){ try {
	db.collection('users').insertOne({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		emailAdress: req.body.emailAdress,
		phoneNumber: req.body.phoneNumber,
		username: req.body.username,
		password: req.body.password,
		hobbies: req.body.hobbies,
		education: req.body.education,
		job: req.body.job,
		profilePictures: req.body.profilePictures,
		age: req.body.age,
	}, done)

	function done(err, data) {
		if (err) {
			next(err)
		} else {
			res.redirect('/allUsers')
		}
	}
	} catch(err) {
		console.log(err)
	}
}

router.post('/', add)