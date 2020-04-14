const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const matchService = require('../services/matchService');
const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
	db = database
});

router.get('/dashboard', auth, async (req, res) => {
  const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
  const users = await db.collection('users').find().toArray();
  const matches = await matchService.getMatches(user, users);
  const hobbies = await db.collection('hobbies').find().toArray();
  const route = 'dashboard';
  res.render('pages/dashboard', { user, route, matches, hobbies });
});

module.exports = router;