const express = require('express');
const bodyParser = require('body-parser');
const dbs = require('./config/db');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//CRUD

app.get('/', (req,res) => {
   db.collection('quotes').find().toArray((err, result) => {
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

app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate({name: 'Jesus'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true,
  }, (err,result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({message: 'A darth vade quote got deleted'});
    });
});


//DATABASE
const MongoClient = require('mongodb').MongoClient;

var db
MongoClient.connect(dbs.url, (err, database) => {
  if (err) return console.log(err);

  db = database;
//LISTEN
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});
