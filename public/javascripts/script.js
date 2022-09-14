'use strict'

let uploadfield = document.getElementById("uploadfield")
let inputJson = document.getElementById('inputJson');
let textarea = document.getElementById('textarea');
let bergtabelle = document.getElementById('myTableData');

/**
 * fuegt dein einzelnen Zeilen der Tabelle auf der "Anzeigen" Seite ihre click-Funktionalität hinzu.
 * Bei klicken auf eine Zeile wird auf den entsprechenden Kartenausschnitt gezoomed.
 */
function zeilenEvents() {
    var rows = bergtabelle.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = bergtabelle.rows[i];
        var helper = function (row) {
            return function () {
                var y = row.getElementsByTagName("td")[2].innerHTML;
                var x = row.getElementsByTagName("td")[1].innerHTML;
                map.setView([x, y], 8);
            };
        };
        currentRow.onclick = helper(currentRow);
    }
}
if (bergtabelle !== null) {
    window.onload = zeilenEvents();
}

uploadfield.addEventListener('change', function () {

    // if a file was selected
    if (uploadfield.files.length > 0) {
        var reader = new FileReader() // File reader to read the file 
        reader.readAsText(uploadfield.files[0]); // read the uploaded file
        // event listener, if the reader has read the file
        reader.addEventListener('load', function () {
            var result = JSON.parse(reader.result)
            var str = JSON.stringify(result, undefined, 4);
            textarea.value = str;
        })
    }
})

inputJson.addEventListener('click', function () {
    let JSON_input = document.getElementById("JSONText")
    // testing 
    console.log(JSON_input);
    // Here I check, whether the input is viable as a JSON/GeoJSON object
    if (isJsonString(JSON_input.value)) {
        // Here I check, whether the GeoJSON is a point, because only than i can calculate properly
        if (JSON.parse(JSON_input.value).geometry.type == "Point") {
            let point = JSON.parse(document.getElementById("JSONText").value);
            //testing 
            console.log('GEIL ALTER');
            console.log(point);
            //addMarker(point);
        } else {
            // Error!
            alert("WRONG INPUT! PLEASE TRY AGAIN");
        }
    } else {
        // Error!
        alert("WRONG INPUT! PLEASE TRY AGAIN");
    }
})
/**
 * prueft, ob der uebergebene String im Json-Format ist.
 * @param {*} str zu pruefender String
 * @returns true wenn der String im Json Format ist
 *          false wenn der String nicht im Json Format ist
 */
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * fuegt der Tabelle eine neue Zeile hinzu.
 */
function addRow() {
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML = '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML = myName.value;
    row.insertCell(2).innerHTML = age.value;
}

/**
 * Entfernt eine Zeile aus der Tabelle.
 * @param {} obj zu loeschendes Objekt
 */
function deleteRow(obj) {
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
}

/**
 * Erzeugt eine neue Tabelle.
 */
function addTable() {
    var myTableDiv = document.getElementById("myDynamicTable");
    var table = document.createElement('TABLE');
    table.border = '1';
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < 4; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            td.appendChild(document.createTextNode("Cell " + i + "," + j));
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
}

/**
 * Lädt die Seite.
 */
function load() {
    console.log("Page load finished");
}