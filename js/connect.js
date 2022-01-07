let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const makeAjaxCall = (val, method, url, data=null, async=true) => {
    let xml = new XMLHttpRequest();

    xml.onreadystatechange = () => {
        console.log(" (" + val + ") ready state: " + xml.readyState + " status: " + xml.status);
        if (xml.readyState == 4) {
            if (xml.status.toString().match("^[2][0-9]{2}$")) {
                console.log(" (" + val + ") the response: ");
                console.log(xml.responseText);
            }
            else {
                console.log(" (" + val + ") ERROR: " + xml.status);
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

console.log(" calling post");
makeAjaxCall(1, "POST", postURL, newEmployeeData);

console.log("\n\n\n calling get to see changes");
makeAjaxCall(2, "GET", getURL);

console.log("\n\n\n calling delete");
makeAjaxCall(3, "DELETE", deleteURL + 1);

console.log("\n\n\n calling get to see delete changes");
makeAjaxCall(4, "GET", getURL);

console.log(" create update emp dummy");
updateEmployeeData = {
    "Name": "Harry James Potter",
    "id": 3,
    "Salary": 4789
}


setTimeout(() => {
    console.log(" calling put");
    makeAjaxCall(5, "PUT", updateURL + 3, updateEmployeeData);
}, 3000);
