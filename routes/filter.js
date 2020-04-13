const express = require('express');
const router = express.Router();
// const ObjectID = require('mongodb').ObjectID;
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

//pak de inhoud van het inputfield
//zoek de hobby op en zet het om naar het id van die hobby
//zoek in het array met hobbys van de gebruiker
//array de gebruikers die dat hebben

router.post('/result', async (req, res) => {
  try {
    let filter = req.body.filter;
    const hobbyName = await db.collection('hobbies').findOne({'name': filter});
    let hobbyId = hobbyName._id;
    console.log(hobbyId);
    const data = await db.collection('users').find({ hobbies: hobbyId.toHexString() }).toArray();
    const route = 'result';
    console.log(data);
    console.log(hobbyId);
    res.render('pages/filter/result.ejs', { data: data, hobbyName, hobbyId, route });
  } catch (err) {
    console.log(err);
  }
})

//haal alle items uit het array 'hobbies' op
//vergelijk welke id's van het array 'hobbies' in 'hobbies' collection zitten
//die arrayen en mee sturen 

router.get('/result', async (req, res) => {
  try {
    const hobbyList = await db.collection('users').hobbies.find({ 
      hobbies
    });
    const data = await db.collection('hobbies').find( { 
      _id: hobbyList 
    });
    let nameOfHobby = data.name;
    res.render('pages/filter/result.ejs', { data: data, nameOfHobby});
  } catch (err) {
    console.log(err);
    res.redirect('/return')
  }
});

module.exports = router;