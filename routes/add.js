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
  res.render('add', {
    title: 'Gebirge hinzufuegen'
  });
});

/* Aus Aufgabe 6 */
router.post('/newpoi', function (req, res, next) {
  console.log("A new mountain has been added through the user interface")
  console.log(req) // show the data that has been passed through the post query
  //let poi = {}
  let poi = JSON.parse(req.body.textarea);
  //poi.poiname = req.body.properties
  //poi.coordinates = req.body.longlat
  console.log(poi)
  addNewBergtoDB(client, dbName, collectionName, poi, res)
  getWikipediaDescription(req.body.url);
})

/**
 * fuegt einen neuen Berg in die Datenbank ein. Analog zu Aufgabe 6(POIs hinzufuegen)
 * @param {*} client Client (siehe oben)
 * @param {*} dbName Name der Datenbank in der der Berg gespeichert werden soll
 * @param {*} collectionName Name der Collection in der der Berg gespeichert werden soll
 * @param {*} poi Berg als geojson
 * @param {*} res result
 */
// retrieve all elements from the database, and pass the results as input data for the search page
async function addNewBergtoDB(client, dbName, collectionName, poi, res) {

  await client.connect()
  console.log('Connected successfully to server')
  
  const db = client.db(dbName)
  const collection = db.collection(collectionName)
  
  collection.insertOne(poi) // see https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
  console.log("New poi inserted in the database");

  // pass the data added as input for the notification page
  res.render('add_notification', {
    title: "Addition Completed",
    newpoi: poi
  })

}

/**
 * prueft, ob der uebergebene string eine gueltige url ist. Teil der Wikipedia-API, die leider nicht richtig funktioniert.
 * @param {*} string zu pruefender string
 * @returns 
 */
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

/**
 * ruft "isValidHttpUrl" auf und prueft zusaetzlich ob es sich um eine wikipedia url handelt. Teil der Wikipedia-API, die leider nicht richtig funktioniert.
 * @param {*} url 
 */
function getWikipediaDescription(url) {
  // Überprüfung auf richtige URL und auf Wikipedia URL
  if (!isValidHttpUrl(url) || url.indexOf("wikipedia") === -1) {
    // wenn nicht
    description = "Kein oder falscher Link, daher keine Beschreibung vorhanden";

  } else {
    // wenn ja
    let urlArray = url.split("/");
    let title = urlArray[urlArray.length - 1];

    // with help from: https://www.youtube.com/watch?v=yqwHxAH1xrw
    axios.get(
      "https://de.wikipedia.org/w/api.php?format=json&exintro=1&action=query&prop=extracts&explaintext=1&exsentences=1&origin=*&titles=" + title
    ).then(function (response) {
      const pageKey = Object.keys(response.data.query.pages)[0];
      description = response.data.query.pages[pageKey].extract;
    });
  }
}

module.exports = router;