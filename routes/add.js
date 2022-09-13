var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'ourdatabase' // database name
const collectionName = 'gebirge' // collection name

/* Addition home page. */
router.get('/', function(req, res, next) 
{
  res.render('add', { title: 'Addition Page' });
});

/*  */
router.post('/newpoi', function(req, res, next) 
{
  console.log("A new poi has been added through the user interface")

 console.log(req) // show the data that has been passed through the post query
  //let poi = {}
  let poi = JSON.parse(req.body.textarea);
  //poi.poiname = req.body.properties
  //poi.coordinates = req.body.longlat
  console.log(poi)
  addNewPOItoDB(client, dbName, collectionName, poi, res)

})


// retrieve all elements from the database, and pass the results as input data for the search page
async function addNewPOItoDB(client, dbName, collectionName, poi, res) 
{

  await client.connect()

  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const collection = db.collection(collectionName)


  collection.insertOne(poi) // see https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
  console.log("New poi inserted in the database");

  // pass the data added as input for the notification page
  res.render('add_notification', {title: "Addition Completed", newpoi: poi})

}


module.exports = router;