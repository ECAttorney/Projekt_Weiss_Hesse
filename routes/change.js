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
  res.render('change', { title: 'SUPER DESTRUCTION Page' });
});

/*  */
router.delete('/change', function(req, res, next) 
{
  console.log("A poi has been removed through the user interface")

 //console.log(req) // show the data that has been passed through the post query
  console.log("IT works")
  let poi = JSON.parse(req.body.textarea);

  removePOIfromDB(client, dbName, collectionName, poi, res)

})


// retrieve all elements from the database, and pass the results as input data for the search page
async function removePOIfromDB(client, dbName, collectionName, poi, res) 
{

  await client.connect()

  console.log('Connected successfully to server')

  const db = client.db(dbName)

  const collection = db.collection(collectionName)
    console.log(poi)

  collection.deleteOne({'properties.name': poi.properties.name})
 
  console.log("1 document deleted")

  console.log("poi removed from the database")

  // pass the data added as input for the notification page
 res.render('delete_notification', {title: "Removal Completed", newpoi: poi})

}


module.exports = router;