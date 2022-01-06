// window.addEventListener("DOMContentLoaded", (event) => {

//     connectWithJsonServer("GET", "http://localhost:3000/employeeData");

// })

function connectWithJsonServer(method, url, callback=null, async = true, data = null) {
    console.log(" the method: " + method);
    let xml = new XMLHttpRequest();

    xml.onreadystatechange = () => {
        
        if(xml.readyState == 4) {
            console.log("ready state: " + xml.readyState + "status: " + xml.status);

            if (xml.status.toString().match("^[2][0-9]{2}$")) {
                callback(JSON.parse(xml.response));
            }

            else if (xml.status.toString().match("^[45][0-9]{2}$")) {
                console.log(" ERROR in the 3-400 range");
            }
 
            else {
                console.log(" ERROR in some unknown thing");
            }
        }
    }

    xml.open(method, url, async);
    
    if(data != null) {
        console.log("updating database");
        xml.setRequestHeader("Content-Type", "Application/json");
        xml.send( JSON.stringify(data));
    }
    else {
        xml.send();
    }
}