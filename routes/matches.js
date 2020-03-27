const express = require('express');
const router = express.Router();
const slug = require('slug');
const mongo = require('mongodb');
const auth = require('../middleware/authentication');
const chatManager = require('../services/chatService');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

// Edit slug so it doesn't replace spaces with '-' -- https://www.npmjs.com/package/slugify
slug.defaults.mode ='pretty';
slug.defaults.modes['pretty'] = {
  replacement: ' ',
  symbols: true,
  remove: /[.]/g,
  lower: false,
  charmap: slug.charmap,
  multicharmap: slug.multicharmap
};

// Render homepage with matches of the logged in user
router.get('/', auth, async (req, res, next) => {  
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectID(req.session.user) });
    const userObjects = user.matches.filter(item => item).map(item => { return new ObjectID(item) });
    const matchList = await db.collection('users').find({
      '_id': {
        '$in': userObjects
      }
    }).toArray();
    res.render('pages/matches/index', { matches: matchList, user });
  } catch(err) {
    console.error(err);
  }
});

// Push id of the liked person to the likedProfiles[] of the user
router.post('/like', async (req, res, next) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.user) });

    // Check if the person is already liked, this means remove the like.
    if (user.likedProfiles.includes(slug(req.body.id))) {
      try {
        const chats = await db.collection('chats').find().toArray();
        const openChats = chats.filter(chat => {
          return chat.users.includes(user._id.toString()) && chat.users.includes(slug(req.body.id).toString());
        });
        await db.collection('users').updateOne({ _id: ObjectID(req.session.user) }, { $pull: { 'likedProfiles': slug(req.body.id) } });
        if (openChats.length > 0) {
          openChats.forEach(chat => chatManager.removeChat(chat));
        }
        if (!req.body.js) {
          return res.redirect('/');
        }
        return res.sendStatus(201);
      } catch(err) {
        console.error(err);
      }
    } else {
      // See if the other user already liked this user too
      checkMatch(req.session.user, req.body.id, res);
      // Add the liked user to the likedProfiles array
      await db.collection('users').updateOne(
        { _id: ObjectID(req.session.user) },
        { $push: { "likedProfiles": slug(req.body.id) } }
      )
      if (!req.body.js) {
        return res.redirect('/');
      }
      return res.sendStatus(200);
    }
  } catch(err) {
    console.error(err);
  }
});

// Load users that are able to login
router.get('/login', async (req, res, next) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.render('pages/matches/login', { users: users });
  } catch(err) {
    console.error(err);
  }
});

// Post route for login
router.post('/login-as', (req, res, next) => {
  // Setting the session user to the selected user on login
  req.session.user = slug(req.body.user);
  res.redirect('/');
});

// Post route for logging out
router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
});

// Function checks if both users liked each other
async function checkMatch(userId, likedUserId, res) {
  try {
    const likedUser = await db.collection('users').findOne({ _id: ObjectID(likedUserId) })
    if (likedUser.likedProfiles.includes(userId)) {
      chatManager.createChat(userId, likedUserId);
    }
  } catch(err) {
    return console.error(err);
  }
}

module.exports = router;