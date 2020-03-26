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

router.get('/allUsers', async (req, res, next) => {
  try {
    const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
    console.log(user);
    res.render('allUsers');
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;

// read data from DB
function users(req, res, next) {
	db.collection('users').find().toArray(done)

	function done(err, data) {
		if (err) {
			next(err)
		} else {
		// console.log(data)
			res.render('allUsers', {data: data})
		}
	}
}

router.get('/allUsers', users)

