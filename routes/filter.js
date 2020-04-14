const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const auth = require('../middleware/authentication');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database; 
});

router.get('/finder', async (req, res) => {
  const hobbies = await db.collection('hobbies').find().toArray();
  const route = 'finder';
  res.render('pages/filter/filter.ejs', { route, hobbies });
})

//takes the value of the input inputfield
//queries the hobby and converts it to the id of that hobby
//searches through the array 'hobbies' of the user
//arrays the users which have those hobbies

router.post('/result', auth, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: ObjectID(req.session.activeUser) });
    const filter = req.body.filter;
    const hobbyName = await db.collection('hobbies').findOne({'name': filter});
    const hobbies = await db.collection('hobbies').find().toArray();
    const hobbyId = hobbyName._id;
    const matches = await db.collection('users').find({ hobbies: hobbyId.toHexString() }).toArray();
    const filteredMatches = matches.filter(matchedUser => {
      let match = false;
      if (matchedUser._id.toString() === user._id.toString()) return false;
      if (matchedUser.gender === user.gender) return false;
      user.hobbies.forEach(hobby => {
        if (matchedUser.hobbies.includes(hobby)) { match = true; }
      });
      return match;
    });
    const route = 'finder';
    res.render('pages/filter-result', { matches: filteredMatches, route, user, hobbies });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;