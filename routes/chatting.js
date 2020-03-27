const express = require('express');
const router = express.Router();
const slug = require('slug');
const dateFormat = require('dateformat');
const mongo = require('mongodb');
const auth = require('../middleware/authentication');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

dateFormat.masks.chatFormat = 'HH:MM - dd/mm';

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



// Render chats
router.get('/chats', auth, async (req, res, next) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.user) });
    const chatList = [];
    user.chats.forEach((chat, err) => {
      if(err) {
        console.error(err);
      }
      chatList.push(db.collection('chats').findOne({ chatNumber: chat }));
    });
    allChats = await Promise.all(chatList);
    if (allChats.length > 0) {
      for (let i =0; i < allChats.length;i++) {
        const userList = [];
        allChats[i].users.forEach(user => {
          userList.push(db.collection('users').findOne({ _id: new ObjectID(user) }))
        });
        allChats[i].users = await Promise.all(userList);
      }
    } else {
      allChats = [];
    }
    res.render('pages/chats/chats', { chats: allChats, user });

  } catch(err) {
    console.error(err);
  }
});

// Render individual chat based on the chat id
router.get('/chat/:id', auth, async (req, res, next) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.user) });
    const id = parseInt(req.params.id);
    const chat = await db.collection('chats').findOne({ chatNumber: id });
    const otherUserId = chat.users[0] == user._id ? chat.users[1] : chat.users[0];
    const otherUser = await db.collection('users').findOne({  _id: ObjectID(otherUserId) });
    res.render('pages/chats/chat', { users: chat.users, messages: chat.messages, user, id, otherUser });
  } catch(err) {
    console.error(err);
  }
});

router.post('/message', async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const chatId = req.body.chatId;
    const message = req.body.message;
    await db.collection('chats').updateOne({ 'chatNumber': parseInt(chatId) }, {
      $push: { messages: {
        message: message,
        userId: userId,
        date: dateFormat(new Date, 'chatFormat')
      } }
    });
    res.redirect('/chat/' + chatId);
  } catch(err) {
    console.error(err);
  }
});

module.exports = router;