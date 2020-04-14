const chatService = require('./chatService');
const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
	db = database
});

async function getMatches(user, users) {
  return users.filter(matchedUser => {
    let match = false;
    if (matchedUser._id.toString() === user._id.toString()) return false;
    if (matchedUser.gender === user.gender) return false;
    user.hobbies.forEach(hobby => {
      if (matchedUser.hobbies.includes(hobby)) { match = true; }
    });
    return match;
  });
}

// Function checks if both users liked each other
async function checkMatch(userId, likedUserId) {
  try {
    const likedUser = await db.collection('users').findOne({ _id: ObjectID(likedUserId) });
    if (likedUser.likedProfiles.includes(userId)) {
      const chatId = await chatService.createChat(userId, likedUserId);
      const data = {
        match: true,
        otherUser: likedUser,
        chat: chatId
      };
      return data;
    } else {
      const data = { match: false };
      return data;
    }
  } catch(err) {
    return console.error(err);
  }
}

// Remove the clicked person from the likes of the current user
async function dislikeUser(user, otherUser) {
  try {
    const chats = await db.collection('chats').find().toArray();
    const openChats = chats.filter(chat => {
      return chat.users.includes(user._id.toString()) && chat.users.includes(otherUser.toString());
    });
    // Delete any open chats between the two users
    if (openChats.length > 0) {
      openChats.forEach(chat => chatService.removeChat(chat));
    }
  
    // Remove the likedPerson from the user
    await db.collection('users').updateOne({ _id: ObjectID(user._id) }, { $pull: { 'likedProfiles': otherUser } });
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  getMatches, checkMatch, dislikeUser
}