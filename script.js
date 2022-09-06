'use strict'

let uploadfield = document.getElementById("uploadfield")
let inputJson = document.getElementById('inputJson');
let JSONText = document.getElementById('JSONText');




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
        

