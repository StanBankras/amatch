const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;
// Use database connection from server.js
const dbCallback = require('../server.js').db;
let db;
dbCallback(database => {
  db = database
});

router.get('/chatting', (req, res, next) => {
    res.render('layout');
})

module.exports = router;