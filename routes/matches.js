const express = require('express');
const router = express.Router();
const slug = require('../helpers/slug');
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

// Render homepage with matches of the logged in user
router.get('/matches', auth, async (req, res) => {  
  try {
    const users = await db.collection('users').find().toArray();
    const user = users.find(x => x._id == req.session.activeUser);
    const matches = await matchService.getMatches(user, users);
    const route = 'matches';
    res.render('pages/matches', { matches, user, route });
  } catch(err) {
    console.error(err);
  }
});

// Push id of the liked person to the likedProfiles[] of the user
router.post('/like', async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });

    // Check if the person is already liked, this means remove the like.
    if (user.likedProfiles.includes(slug(req.body.id))) {
      matchService.dislikeUser(user, slug(req.body.id));

      // If this is not an axios post request, it's submitted by a form, thus the page should be refreshed for the user
      if (!req.body.js) {
        return res.redirect('/');
      }
      return res.sendStatus(201);

    } else {
      // See if the other user already liked this user too
      const data = await matchService.checkMatch(req.session.activeUser, req.body.id, res);
      // Add the liked user to the likedProfiles array
      await db.collection('users').updateOne(
        { _id: ObjectID(req.session.activeUser) },
        { $push: { 'likedProfiles': slug(req.body.id) } }
      )
      if (!req.body.js) {
        return res.redirect('/');
      }
      if (!data.match) {
        return res.json({ match: false });
      } else {
        console.log(data.chat);
        return res.json({ match: true, otherUser: data.otherUser, chat: data.chat });
      }
    }
  } catch(err) {
    console.error(err);
  }
});

module.exports = router;