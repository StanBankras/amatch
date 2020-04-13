const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const auth = require('../middleware/authentication');
const fetch = require('node-fetch');
const profilePictureUpload = require('../helpers/multer').profilePicture;
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
    const hobbies = await db.collection('hobbies').find().toArray();
    const route = 'profile'
    artistId = user.deezerArtistId;
    const apiUrl = 'https://api.deezer.com/artist/' + artistId;
    const fetchResponse = await fetch(apiUrl);
    const json = await fetchResponse.json();
    res.render('pages/profile', { user, route, hobbies, json });
  } catch(err) {
    console.log(err);
  }
});

router.get('/profile/:id', auth, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.params.id) });
    const activeUser = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
    const hobbies = await db.collection('hobbies').find().toArray();
    const route = 'profile'
    artistId = user.deezerArtistId;
    const apiUrl = 'https://api.deezer.com/artist/' + artistId;
    const fetchResponse = await fetch(apiUrl);
    const json = await fetchResponse.json();
    res.render('pages/profile-preview', { user, route, hobbies, activeUser, json });
  } catch(err) {
    console.log(err);
  }
});

router.post('/edit-profile', async (req, res) => {
  const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
  req.userId = user._id.toString();
  profilePictureUpload.single('profilepic')(req, res, async (err) => {
    if (err) {
      res.sendStatus(400);
      console.log(err);
      return;
    }
    const editedItems = {};
    if (req.body.firstName && user.firstName != req.body.firstName) editedItems.firstName = req.body.firstName;
    if (req.body.lastName && user.lastName != req.body.lastName) editedItems.lastName = req.body.lastName;
    if (req.body.birthdate && user.birthdate != req.body.birthdate) editedItems.birthdate = req.body.birthdate;
    if (req.body.education && user.education != req.body.education) editedItems.education = req.body.education;
    if (req.body.job && user.job != req.body.job) editedItems.job = req.body.job;
    if (req.body.description && user.description != req.body.description) editedItems.description = req.body.description;
    if (req.body.hobbies && user.hobbies != req.body.hobbies) editedItems.hobbies = typeof req.body.hobbies === 'string' ? [req.body.hobbies] : req.body.hobbies;
    if(Object.keys(editedItems).length === 0) return res.redirect('/profile');
    await db.collection('users').updateOne({ _id: ObjectID(req.session.activeUser) }, { $set: editedItems });
    res.redirect('/profile');
  });
});

module.exports = router;