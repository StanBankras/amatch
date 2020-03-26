const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const mongo = require('mongodb');

// Load environment variables
require('dotenv').config();

// Mongo setup code, obtained from the Full Driver Sample provided by MongoDB
let db = null;
const callbacks = [];
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;
const server = http.createServer(app);

// Establish connection to MongoDB database
client.connect(() => {
  db = client.db(process.env.DB_NAME);
  callbacks.forEach(callback => callback(db));
  server.listen(port);
  server.on('listening', () => console.log('Listening on port ' + port));
});

// Received help from Alex Bankras (Software engineer) to be able to export my database connection & server
module.exports = {
  db: function(cb) {
      if(db) {
          cb(db)
      } else {
          callbacks.push(cb);
      }
  }
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ 
  resave: false,
  saveUninitialized: true,
  secure: true,
  secret: process.env.SESSION_SECRET
}));

const likeRouter = require('./routes/liking');
const chatRouter = require('./routes/chatting');
const loginRouter = require('./routes/login');
const filterRouter = require('./routes/filter');
app.use('/', likeRouter); // Liking routes
app.use('/', chatRouter); // Chatting routes
app.use('/', loginRouter); // Chatting routes
app.use('/', filterRouter); // Matching routes

app.use((req,res) => { res.status(404).render('404.ejs'); }); // 404 route

app.set('views', 'views');
app.set('view engine', 'ejs');