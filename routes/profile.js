const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const auth = require('../middleware/authentication');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
    const route = 'profile'
    res.render('pages/profile', { user, route });
  } catch(err) {
    console.log(err);
  }
});

router.post('/edit-profile', async (req, res) => {
  const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
  const editedItems = {};
  if (user.firstName != req.body.firstName) editedItems.firstName = req.body.firstName;
  if (user.lastName != req.body.lastName) editedItems.lastName = req.body.lastName;
  if (user.birthdate != req.body.birthdate) editedItems.birthdate = req.body.birthdate;
  if (user.education != req.body.education) editedItems.education = req.body.education;
  if (user.job != req.body.job) editedItems.job = req.body.job;
  if (user.description != req.body.description) editedItems.description = req.body.description;
  console.log(JSON.stringify(editedItems));
  await db.collection('users').updateOne({ _id: ObjectID(req.session.activeUser) }, { $set: editedItems });
  res.redirect('/profile');
});

module.exports = router;