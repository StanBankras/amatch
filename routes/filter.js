const express = require('express');
const router = express.Router();
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database;
});

router.get('/finder', async (req,res) =>{
  const hobbies = await db.collection('hobbies').find().toArray();
  const route = 'finder';
    res.render('pages/filter/filter.ejs', { route, hobbies });
  })

router.post('/result', async (req, res) => {
  try{
    if (req.body.hobby1) {
      req.session.hobby1 = req.body.hobby1;
    }
    let hob = req.session.hobby1;
    if(hob) { 
      const data = await db.collection('users').find({'hobby1': hob}).toArray();
      res.render('pages/filter/result.ejs', {data: data});
    } else {
      res.redirect('/return');
    }
  } catch(err){
    console.log(err);
  }
}) 

// db.collection('users').find( { tags: { $all: [hobby] } } )
// db.inventory.find( { tags: hob } )
// zoek op hobby naam in de hobbies collection en krijg het id
// en met dat id zoeken in het array van de user 

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
         res.render('pages/filter/result.ejs', {data: data})
      }
    }
})

router.get('/return',function(req,res){
  if (req.session.hobby1) {
        req.session.destroy(function(err) {
        if (err) console.log(err)
    })
   }
   res.redirect('/filter')
})

module.exports = router;