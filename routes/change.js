var express = require('express');
var router = express.Router();
const {
  MongoClient
} = require('mongodb')

const url = 'mongodb://127.0.0.1:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'ourdatabase' // database name
const collectionName = 'gebirge' // collection name

/* Addition home page. */
router.get('/', function (req, res, next) {
  getMountains(client, dbName, collectionName, res)
  
});

/*  */
router.post("/deleteOne", function (req, res, next) {

  var gebirgeID = req.body.id;

  // Überprüft ob Gebirge ausgewält wurde
  if (gebirgeID == "") {
    res.render("delete_notification", {
      title: "Kein Gebirge ausgewählt!",
    });
  } else {
    deleteMountains(req, client, dbName, collectionName, res)
  }
});

/**
 * entfernt einen berg aus der datenbank. Funktioniert nicht richtig.
 * @source Quelle: https://www.mongodbtutorial.org/mongodb-crud/mongodb-deleteone/
 * @param {*} req request
 * @param {*} client Client (siehe oben)
 * @param {*} dbName Name der Datenbank aus der der Berg entfernt werden soll
 * @param {*} collectionName Name der Collection aus der der Berg entfernt werden soll
 * @param {*} res result
 */
async function deleteMountains(req, client, dbName, collectionName, res) {

  await client.connect()
  console.log('Connected successfully to the database')
  
  const db = client.db(dbName)
  const collection = db.collection(collectionName)

  var bergid = req.body.id;

  const cursor =  collection.find({ _id: ObjectId(bergid) })
  const results = await cursor.toArray(function (err, docs) {
    if (docs.length >= 1) {
      collection.deleteOne({ _id: ObjectId(bergid) }, function (err, results) {
      });
      res.render("delete_notification", {
        title: "Löschen erfolgt",
      });
    } 
  })
}

/**
 * gibt alle berge aus der datenbank zurueck. Teil der Delete-Funktionalität die nicht richtig funktioniert.
 * @param {*} client Client (siehe oben)
 * @param {*} dbName Name der Datenbank 
 * @param {*} collectionName Name der Collection
 * @param {*} res result
 */
async function getMountains(client, dbName, collectionName, res) 
{

  await client.connect()
  console.log('Connected successfully to the database')

  const db = client.db(dbName)
  const collection = db.collection(collectionName)

  const cursor =  collection.find({})
  const results = await cursor.toArray(function (err, docs) {
  // pass the results data as input for the edit
  res.render('change', { title: 'Gebirge bearbeiten', data: docs });

})
}

module.exports = router;