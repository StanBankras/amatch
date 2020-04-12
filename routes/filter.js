const express = require('express');
const router = express.Router();
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
<<<<<<< HEAD
    let filter = req.body.filter;
    let hobbyId = null;
    const hobbyNames = await db.collection('hobbies').find({'name': filter});
    const data = await db.collection('users').find({ hobbies: hobbyNames.forEach((name, hobbyId) => {
      hobbyId = name._id;
      console.log(hobbyId);
      return hobbyId;
    })
    }).toArray();
    console.log(data);
    const route = 'result';
    res.render('pages/filter/result.ejs', { data: data, hobbies: hobbyId, route });
  } catch (err) {
    console.log(err);
=======
    if (req.body.hobby1) {
      req.session.hobby1 = req.body.hobby1
    }
    let hob = req.session.hobby1 
    if(hob) { 
      const data = await db.collection('users').find({'hobby1': hob}).toArray()
      const route = 'finder';
      res.render('pages/filter/result.ejs', {data: data, route})
    } else {
      res.redirect('/return')
    }
  } catch(err) {
    console.log(err)
>>>>>>> 64d453ccb31084edafe290742c51d6b91643340d
  }
})

// { results: { $elemMatch: { _id: hobbyId} } }

<<<<<<< HEAD
// res.render('pages/filter/result.ejs', { data: data, hobbies }
// const data = await db.collection('users').find({ tags: { $all: [filter] } })

// db.collection('users').find( { tags: { $all: [hobby] } } )
// const hobbies = await db.collection('hobbies').find().toArray();
// db.inventory.find( { tags: hob } )

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
=======
router.get('/result', (req, res, next) => {
    let hob = req.session.hobby1
    if (hob) {
       db.collection('users')
           .find({'hobby1': hob}).toArray(done)
    } else {
       res.redirect('/return')
    }
    function done(err, data) {
      if (err) {
        next(err)
      } else {
         res.render('pages/filter/result.ejs', {data: data, route})
      }
    }
>>>>>>> 64d453ccb31084edafe290742c51d6b91643340d
})

// const userObjects = user.matches.filter(item => item).map(item => { return new ObjectID(item) });

router.get('/return', function (req, res) {
  if (req.session.filter) {
    req.session.destroy(function (err) {
      if (err) console.log(err)
    })
  }
  res.redirect('/filter')
})

module.exports = router;