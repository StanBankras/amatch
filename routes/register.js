const express = require('express');
const router = express.Router();
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

router.get('/register', async (req, res) => {
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
	console.log(req.body);
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

	function done(err) {
		if (err) {
			next(err)
		} else {
			res.redirect('/allUsers')
		}
	}
}