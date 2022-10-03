let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const makeAjaxCall = (val, method, url, data=null, async=true) => {

    return new Promise( (resolve, reject) => {
        
        let xml = new XMLHttpRequest();
        
        xml.onreadystatechange = () => {
            console.log(" (" + val + ") " + method + " ready state: " + xml.readyState + " status: " + xml.status);
            if (xml.readyState == 4) {
                if (xml.status.toString().match("^[2][0-9]{2}$")) {
                    resolve(" (" + val + ") the response: " + xml.responseText)
                }
                else {
                    reject(" (" + val + ") ERROR: " + xml.status)
                    // console.log(" (" + val + ") ERROR: " + xml.status);
                }
            }
        }
        
        xml.open(method, url, async);
        if (data) {
            console.log(" (" + val + ") we have data to deal with");
            xml.setRequestHeader("Content-Type", "Application/json")
            console.log(" (" + val + ") sent data request");
            xml.send(JSON.stringify(data));
        }
        else {
            xml.send();
            console.log(" (" + val + ") sent request");
        }
        
    })
}

const getURL = "http://localhost:3000/employees";
const postURL = "http://localhost:3000/employees";
const deleteURL = "http://localhost:3000/employees/";
const updateURL = "http://localhost:3000/employees/";


console.log(" create new emp dummy");
newEmployeeData = {
    "Name": "Harry Potter",
    "id": 3,
    "Salary": 4789
}

console.log(" create update emp dummy");
updateEmployeeData = {
    "Name": "Harry James Potter",
    "id": 3,
    "Salary": 4789
}

console.log(" calling post first");
makeAjaxCall(1, "POST", postURL, newEmployeeData)
    .then( (response) => {
        console.log(" posted ");
        console.log(response);
        console.log("\n\n\n");
    })
    .catch( (rejected) => {
        console.log(" promise rejected");
        console.log(rejected);
    });

console.log("\n\n\n calling get to see changes");
makeAjaxCall(2, "GET", getURL)
    .then( (response) => {
        console.log(" got");
        console.log(response);
        console.log("\n\n\n");
    })
    .catch( (rejected) => {
        console.log(rejected);
    });

console.log("\n\n\n calling delete");
makeAjaxCall(3, "DELETE", deleteURL + 1)
    .then( (response) => {
        console.log(" deleted");
        console.log(response);
        console.log("\n\n\n");
    })
    .catch( (rejected) => {
        console.log(rejected);
    });

console.log("\n\n\n calling get to see delete changes");
makeAjaxCall(4, "GET", getURL)
    .then( (response) => {
        console.log(" got");
        console.log(response);
        console.log("\n\n\n");
    })
    .catch( (rejected) => {
        console.log(rejected);
    });

makeAjaxCall(5, "PUT", updateURL + 3, updateEmployeeData)
    .then( (response) => {
        console.log(" updated");
        console.log(response);
        console.log("\n\n\n");
    })
    .catch( (rejected) => {
        console.log(rejected);
    });