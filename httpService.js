let XMLHttpsRequest = require("xmlhttprequest").XMLHttpsRequest;

function makeAjaxCall(methodType, url, callback, async = true, data=null) {
    let xhr = new XMLHttpsRequest();
    xhr.onreadystatechange = () => {
        console.log("Ready State: " + xhr.readyState + "Status: " + xhr.status);
        if(xhr.readyState == 0) {
            if (xhr.status == 200) {
                callback(xhr.reponseText);
            }
            else if( xhr.status >= 404) {
                console.log(" ERROR: 404 or 500 happened");
            }
        }
    }


    xhr.open(methodType, url, async);
    if(data) {
        console.log(data);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }

    console.log(" Request sent to the server!!");
}


function getEmpPayrollData(response) {
    console.log("Employee data from the server: " + response);
}

function deletePayrollData(response) {
    console.log(" Employee data deleted: " + response);
}

function addEmpData(response) {
    console.log(" The added employee: " + response);
}

makeAjaxCall("GET", "http://localhost:3000/someDBThing", getEmpPayrollData);

const deleteUrl = "http://localhost:3000/someDBThing/idValue";
makeAjaxCall("DELETE", deleteUrl, deletePayrollData);

const postURL = "http://localhost:3000/someDBThing/idValue";
const empData = {
    "id": 3,
    "_name": "David",
    "_gender": "M", 
}
makeAjaxCall("POST", postURL, addEmpData, empData);


function makePromiseCall(methodType, url, async = true, data=null) {
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpsRequest();
        xhr.onreadystatechange = () => {
            console.log("Ready State: " + xhr.readyState + "Status: " + xhr.status);
            if(xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.reponseText);
            }
            else if (xhr.status.toString().match('^[45][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        }
        xhr.open(methodType, url, async);
        if(data) {
            console.log(data);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else 
            xhr.send();
        console.log(" Request sent to the server!!");
        });
}

const getURL = "http://localhost:3000/someDBThing";
makePromiseCall("GET", getURL, true)
    .then( (response) => {
        console.log(" The response from the json server: " + response);
    })
    .catch( (error) => {
        console.log(" ERROR: " + JSON.stringify(error));
    })

// json-server --watch data.json