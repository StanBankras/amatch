const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

// Creates a new chat in the database and links it to two users
async function createChat(id, otherId) {
  try {
    const lastChat = await db.collection('chats').findOne({}, { sort: { chatNumber: -1 }, limit: 1 });
    const chatNumber = lastChat === null ? 0 : lastChat.chatNumber+1;
    await db.collection('chats').insertOne({
      chatNumber: chatNumber, users: [id, otherId], messages: []
    });
    await db.collection('users').updateOne(
      { _id: ObjectID(id) },
      { $push: { "chats": chatNumber } }
    )
    await db.collection('users').updateOne(
      { _id: ObjectID(otherId) },
      { $push: { "chats": chatNumber } }
    )
  } catch(err) {
    console.error(err);
  }
}

// Removes a chat from the chats collection and from the array of chats for the users that are in the chat
async function removeChat(chat) {
  try {
    const users = chat.users;
    // Delete the chat
    await db.collection('chats').deleteOne({ chatNumber: chat.chatNumber });
    // Delete chat for the users
    users.forEach(async (user) => {
      await db.collection('users').updateOne({ _id: ObjectID(user) }, { $pull: { 'chats': chat.chatNumber } });
    })
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  removeChat, createChat
}