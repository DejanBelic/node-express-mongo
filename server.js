console.log('Server side code running.');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = require('./config/key').mongoURI;
const app = express();

// Serve files from public directory.
app.use(express.static('public'));

// Connect to the db and start express server.
let db;

MongoClient.connect(url,(err, database) => {
  if (err) {
    return console.log(err)
  }
  db = database;
  app.listen(8080, () => {
    console.log('listening on 8080')
  });
});


// Serve the home page.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})