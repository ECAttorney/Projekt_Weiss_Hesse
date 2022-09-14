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

// source: https://www.mongodbtutorial.org/mongodb-crud/mongodb-deleteone/
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


// retrieve all elements from the database, and pass the results as input data for the search page
async function removePOIfromDB(client, dbName, collectionName, poi, res) {

  await client.connect()

  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const collection = db.collection(collectionName)
  console.log(poi)

  collection.deleteOne({
    'properties.name': poi.properties.name
  })

  console.log("1 document deleted")

  console.log("poi removed from the database")

  // pass the data added as input for the notification page
  res.render('delete_notification', {
    title: "Löschen erfolgt",
    newpoi: poi
  })

}

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