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
    console.log(user);
    res.render('register');
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;

router.post('/', add)

// add data to DB
function add(req, res, next){
	db.collection('users').insertOne({
		firstName: req.session.firstName,
		lastName: req.session.lastName,
		emailAdress: req.session.emailAdress,
		phoneNumber: req.session.phoneNumber,
		username: req.session.username,
		password: req.session.password,
		hobbies: req.session.hobbies,
		education: req.session.education,
		job: req.session.job,
		profilePictures: req.session.profilePictures,
		age: req.session.age,
	}, done)

	function done(err, data) {
		if (err) {
			next(err)
		} else {
			res.redirect('/allUsers')
		}
	}
}