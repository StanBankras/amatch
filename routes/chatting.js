const express = require('express');
const router = express.Router();
const dateFormat = require('dateformat');
const mongo = require('mongodb');
const slug = require('../helpers/slug');
const auth = require('../middleware/authentication');
const chatService = require('../services/chatService');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

dateFormat.masks.chatFormat = 'HH:MM - dd/mm';

// Render chats
router.get('/chats', auth, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
    console.log(user);
    const allChats = await chatService.getUserChats(user);
    const route = 'chats';
    res.render('pages/chats', { chats: allChats, user, route });
  } catch(err) {
    console.error(err);
  }
});

// Render individual chat based on the chat id
router.get('/chat/:id', auth, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.sendStatus(400);
    const chat = await db.collection('chats').findOne({ chatNumber: id });
    const otherUserId = chat.users[0] == user._id ? chat.users[1] : chat.users[0];
    const otherUser = await db.collection('users').findOne({ _id: ObjectID(otherUserId) });
    const route = 'chats';
    res.render('pages/chat', { users: chat.users, messages: chat.messages, user, id, otherUser, route });
  } catch(err) {
    console.error(err);
  }
});

router.post('/message', async (req, res) => {
  try {
    const userId = slug(req.body.userId);
    const chatId = slug(req.body.chatId);
    const message = slug(req.body.message);
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