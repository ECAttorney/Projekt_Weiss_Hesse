'use strict'

let uploadfield = document.getElementById("uploadfield")
let inputJson = document.getElementById('inputJson');
let textarea = document.getElementById('textarea');
/** 
let loeschen = document.getElementById('loeschknopf');

loeschen.addEventListener('click', function(){
    submitData();
})

async function submitData(){
    let id = req.body.textarea;
    fetch(url + id, {
     method: 'DELETE',
})
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
  }
*/
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
        textarea.value = str;
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

function addMarker(point){

    let x = point.geometry.coordinates[1];
    let y = point.geometry.coordinates[0];
    
    var marker = L.marker([x, y]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}
        
            function addMarker(point){

                let x = point.geometry.coordinates[1];
                let y = point.geometry.coordinates[0];
            
                var marker = L.marker([x, y]).addTo(map);
                marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
            }

            function addRow() {
          
                var myName = document.getElementById("name");
                var age = document.getElementById("age");
                var table = document.getElementById("myTableData");
             
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
             
                row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
                row.insertCell(1).innerHTML= myName.value;
                row.insertCell(2).innerHTML= age.value;
             
            }
             
            function deleteRow(obj) {
                  
                var index = obj.parentNode.parentNode.rowIndex;
                var table = document.getElementById("myTableData");
                table.deleteRow(index);
                
            }
             
            function addTable() {
                  
                var myTableDiv = document.getElementById("myDynamicTable");
                  
                var table = document.createElement('TABLE');
                table.border='1';
                
                var tableBody = document.createElement('TBODY');
                table.appendChild(tableBody);
                  
                for (var i=0; i<3; i++){
                   var tr = document.createElement('TR');
                   tableBody.appendChild(tr);
                   
                   for (var j=0; j<4; j++){
                       var td = document.createElement('TD');
                       td.width='75';
                       td.appendChild(document.createTextNode("Cell " + i + "," + j));
                       tr.appendChild(td);
                   }
                }
                myTableDiv.appendChild(table);
                
            }
             
            function load() {
                
                console.log("Page load finished");
             
            }
