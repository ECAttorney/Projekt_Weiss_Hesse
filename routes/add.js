
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('www').window.document;
var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const gjv = require("geojson-validation");
const fs = require("fs");
const axios = require("axios");

const url = 'mongodb://127.0.0.1:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'ourdatabase' // database name
const collectionName = 'gebirge' // collection name

let uploadfield = document.querySelector('#'+'uploadfield')
//let uploadfield = document.getElementById('uploadfield')
console.log(uploadfield);
let inputJson = document.getElementById('inputJson');
console.log(inputJson);
let JSONText = document.getElementById('JSONText');


router.get('/', function(req, res, next) 
{
  res.render('add', { title: 'Addition Page' });
});

/** */
router.post('/JSONText', function(req, res, next) 
{
  try {
    JSON.parse(req.body.JSONText);
  }
  catch (err) {
   // res.render("notification", {
   //   title: "Falsche Eingabe! Bitte nur einzelne Features, keine FeatureCollections!",
    //});
  }
  let mountain = JSON.parse(req.body.JSONText);
  //getWikipediaDescription(mountain.properties.url);

  console.log("A new poi has been added through the user interface")

  console.log(req) // show the data that has been passed through the post query
  //let poi = {}
  //poi.poiname = JSON.parse(req.body.properties.name
  //poi.coordinates = req.body.longlat
      // Hier wird mit Timeout gearbeitet, damit die Beschreibung gegeben ist
      setTimeout(function () {
        mountain.properties.description = description;
  
        // Verbindung zur Datenbank wird hergestellt und der Punkt hinzugefügt
        client.connect(function (err) {
  
          console.log("Connected successfully to server");
  
          // abrufen der DB und ihrere Kollektion
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
  
          // Einfügen in die Datenbank
          collection.insertOne(mountain, function (err, result) {
            console.log(
              `Inserted ${result.insertedCount} document into the collection`);
          //  res.render("notification", { title: "Gebirge hinzugefügt!", data: JSON.stringify(mountain) });
          });
        });
      }, 1500);
  //addNewPOItoDB(client, dbName, collectionName, mountain, res)

});
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


/** 
uploadfield.addEventListener('change', function(){

    // if a file was selected
    if (uploadfield.files.length > 0) 
    {
    var reader = new FileReader() // File reader to read the file 

    reader.readAsText(uploadfield.files[0]); // read the uploaded file
    
    // event listener, if the reader has read the file
    reader.addEventListener('load', function() {
        
        var result = JSON.parse(reader.result)
        var str = JSON.stringify(result, undefined, 4);
        JSONText.value = str;
    })
}
})

inputJson.addEventListener('click', function(){
    
    let JSON_input = document.getElementById("JSONText")

                // testing 
                console.log(JSON_input);

                // Here I check, whether the input is viable as a JSON/GeoJSON object
                if(isJsonString(JSON_input.value)){

                    // Here I check, whether the GeoJSON is a point, because only than i can calculate properly
                    if(JSON.parse(JSON_input.value).geometry.type == "Point"){

                        let point = JSON.parse(document.getElementById("JSONText").value);

                        //testing 
                        console.log('GEIL ALTER');
                        console.log(point);
                        //addMarker(point);
                        AddNewPOItoDB;

                        
                    }
                    else{

                        // Error!
                        alert("WRONG INPUT! PLEASE TRY AGAIN");

                    }      

                }
                else{

                    // Error!
                    alert("WRONG INPUT! PLEASE TRY AGAIN");

                }


            })

function isJsonString(str) {

                try{

                JSON.parse(str);

                } 

                catch (e){

                return false;

                }

                return true;

}
*/
module.exports = router;

/**
 * POST Befehl für einen durch das Eingabefeld vom Nutzer hinzugefügtes Gebirge in GeoJSON Format als Text
 */