const express = require('express');
const router = express.Router();
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

router.get('/', (req, res) => {
  res.render('pages/login/login');
})

// login using username and password (not working/ workin on)
function login(req, res) {
	db.collection('users').findOne({
		username: req.body.username,
		password: req.body.password
	}).then(data => {
		req.session.id = data._id
		console.log(data)
		res.redirect('/profile/' + data._id)
	}).catch(() => {
		res.redirect('/')
	})
}

router.post('/', login)

router.get('/register', async (req, res) => {
  try {
    res.render('pages/login/register');
  } catch(err) {
    console.log(err);
  }
})

// add data to DB
function add(req, res){ 
	try {
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
	} catch(err) {
		console.log(err)
	}
}

router.post('/register', add);

router.get('/forgotPw', async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
    console.log(user);
    res.render('pages/login/forgotPw');
  } catch(err) {
    console.log(err);
  }
})

router.get('/allUsers', users, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
    console.log(user);
    res.render('pages/login/allUsers');
  } catch(err) {
    console.log(err);
  }
})

// read data from DB
function users(req, res) {
	db.collection('users').find().toArray(done)

	function done(err, data) {
		if (err) {
			next(err)
		} else {
			res.render('pages/login/allUsers', {users: data})
		}
	}
}

router.get('/allUsers', users)

module.exports = router;