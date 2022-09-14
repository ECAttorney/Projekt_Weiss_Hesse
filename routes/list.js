var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "ourdatabase";
const collectionName = "gebirge";

router.get('/', function (req, res, next) {
  client.connect(function (err) {
    assert.equal(null, err);

    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.find({}).toArray(function (err, docs) {
      assert.equal(err, null);
      console.log('Found the following records...');
      res.render('list', {
        title: 'Liste von Gebirgen',
        data: docs
      });

    })

  })
});

module.exports = router;