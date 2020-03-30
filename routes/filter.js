const express = require('express');
const session = require('express-session')
const router = express.Router();
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

router.use(session({ resave: false, saveUninitialized: true, secret: process.env.SESSION_SECRET }))

router.get('/filter', function(req,res){
  let hob = req.session.hobby1 
  if(hob) {
      db.collection('users').find({'hobby1': hob}).toArray(done)
      function done(err) {
           if (err) {
              next(err)
           } else {
              res.redirect('/result')
           }
       }
  }
  else {
      res.render('../views/pages/filter/filter.ejs');
  }
})

router.post('/result', search) 
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
         res.render('../views/pages/filter/result.ejs', {data: data})
      }
    }
})

function search(req, res, next) {
  if (req.body.hobby1) {
    req.session.hobby1 = req.body.hobby1
  }
  let hob = req.session.hobby1 
  if(hob) { 
    db.collection('users').find({'hobby1': hob}).toArray(done)
  } else {
    res.render('/return')
    
  }
  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('../views/pages/filter/result.ejs', {data: data})
    }
  }
}

router.post('/update', update) 
router.get('/update', (req, res) =>  
  res.render('./views/pages/filter/update.ejs'))


router.get('/return',function(req,res){
  if (req.session.hobby1) {
        req.session.destroy(function(err) {
        if (err) console.log(err)
    })
   }
   res.redirect('/filter')
})

function update(req, res, next){
  let id = req.body.id
  let name = req.body.name
  let filter = {_id: mongo.ObjectId(id)};
  let update = {$set: {name: name}}
  db.collection('users').updateOne(filter, update)
  db.collection('users').find().toArray
  (done)

  function done(err) {
        if (err) {
          next(err)
        } else {
          res.redirect('/result')
          console.log('redirected')
        }
      }
}

module.exports = router;