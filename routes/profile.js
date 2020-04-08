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

router.get('/profile', async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ 'firstName': 'Jan' });
    console.log(user);
    res.render('profile');
  } catch(err) {
    console.log(err);
  }
})

router.get('/profile/:id/', async (req, res) => {
	try {
    const profile = await db.collection('users').findOne({ _id: ObjectID(req.params.id) })	
    // console.log(req.params.id)
		res.render('pages/login/profile.ejs', {users: profile})
	} catch(err) {
		console.log(err)
	}
})


// Writing the function: help from Merlijn Bergevoet 
// Debugging: help from Stan Bankras
router.post('/change', async (req, res) => {
  const newName = req.body.username;
  const myquery = {_id: ObjectID(req.session.activeUser)}
  const newvalues = {username: newName}
  try {
    console.log(req.session)
    await db.collection('users').updateOne(myquery, {$set:newvalues})
    res.redirect('/profile/' + req.session.activeUser)
  } catch(err) {
    console.log(err)
  }
}) 


module.exports = router;