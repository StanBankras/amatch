const express = require('express');
const router = express.Router();
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
	db = database
});
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Loggin with using username and password
router.get('/', (req, res) => {
	res.render('pages/login/login');
})

// Loggin post route
router.post('/', async (req, res) => {
	try {
		const data = await db.collection('users').findOne({
			username: req.body.username
		})

		const match = await bcrypt.compare(req.body.password, data.password);

		if(match) {
			req.session.activeUser = data._id;
			res.redirect('/dashboard');
		} else {
			res.redirect('/')
		}
	} catch (err) {
		console.log(err);
	}
})

// Register your own user
router.get('/register', async (req, res) => {
	try {
		const hobbies = await db.collection('hobbies').find().toArray();
		res.render('pages/login/register', {hobbies});
	} catch (err) {
		console.log(err);
	}
})

// Add user data to database
router.post('/register', async (req, res) => {
	const passwordHash = await bcrypt.hashSync(req.body.password, saltRounds);
	try {
		await db.collection('users').insertOne({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			emailAdress: req.body.emailAdress,
			phoneNumber: req.body.phoneNumber,
			username: req.body.username,
			password: passwordHash,
			hobbies: req.body.hobbies,
			education: req.body.education,
			job: req.body.job,
			gender: req.body.gender,
			birthDate: req.body.birthDate,
			age: req.body.age,
			likedProfiles: [],
			chats: []
		})
		res.redirect('/allUsers')
	} catch (err) {
		console.log(err)
	}
});

router.get('/forgotPw', async (req, res) => {
	try {
		const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
		console.log(user);
		res.render('pages/login/forgotPw');
	} catch (err) {
		console.log(err);
	}
})

router.post('/log-out', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;