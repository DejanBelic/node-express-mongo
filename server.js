console.log('Server side code running.');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = require('./config/key').mongoURI;
const app = express();
const mongoose = require('mongoose');
let ClicksSchema = require('./Schema/Schema');
const ClicksCollection = mongoose.model('clicks', ClicksSchema);

// Serve files from public directory.
app.use(express.static('public'));

// Connect to the db and start express server.
let db;

// MongoClient.connect(url,(err, database) => {
//   if (err) {
//     return console.log(err)
//   }
//   db = database;
//   app.listen(8080, () => {
//     console.log('listening on 8080')
//   });
// });

// Connect to MongoDB.
mongoose
  .connect(url, { useNewUrlParser: true})
  .then((client) => {
    db = client;
    console.log('MongoDB Connected')
      app.listen(8080, () => {
    console.log('listening on 8080')
  });
  })
  .catch(err => console.log(err));

// Serve the home page.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => {
  const click = { clickTime: new Date()};
  console.log(click);
  console.log(db);
  let clickEntry = new ClicksCollection(click);
  clickEntry.save(function (err, book) {
    if (err) return console.error(err);
    res.sendStatus(201);
  });

});

app.get('/clicks', (req, res) => {
  db.collection('clicks').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result)
  })
})
