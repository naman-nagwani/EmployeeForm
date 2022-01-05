window.addEventListener("DOMContentLoaded", (event) => {

    let xml = new XMLHttpRequest();

    xml.onreadystatechange = () => {
        console.log(xml.readyState + ": " + xml.status);
        if (xml.readyState == 4) {
            if (xml.status.toString().match("^[2][0-9]{2}$")) {
                let result = JSON.parse(xml.response);
                console.log(" The response: " + JSON.stringify(result[1]));
            }

            else if (xml.status.toString().match("^[45][0-9]{2}$")) {
                console.log(" ERROR in the 3-400 range");
            }
 
            else {
                console.log(" ERROR in some unknown thing");
            }

        }
    }

    xml.open("GET", "http://localhost:3000/employeeData");
    xml.send();

})