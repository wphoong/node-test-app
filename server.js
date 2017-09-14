const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//CRUD

app.get('/', (req,res) => {
  var cursor = db.collection('quotes').find().toArray(function(err, result) {
    if (err) return console.log(err);

    res.render('index.ejs', { quotes: result });
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err,result) => {
    if (err) return console.log(err);
  });

  console.log('saved to db');
  res.redirect('/');
});


//DATABASE
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://node-test:test@ds117830.mlab.com:17830/node-test-app', (err, database) => {
  if (err) return console.log(err);
  db = database;
});

//LISTEN

app.listen(3000, () => {
  console.log('listening on 3000');
});
