// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const makeAjaxCall = (method, url, data=null, async=true) => {

    return new Promise( (resolve, reject) => {
        
        let xml = new XMLHttpRequest();
        
        xml.onreadystatechange = () => {
            console.log(" " + method + " ready state: " + xml.readyState + " status: " + xml.status);
            if (xml.readyState == 4) {
                if (xml.status.toString().match("^[2][0-9]{2}$")) {
                    resolve(xml.responseText)
                }
                else {
                    reject({
                        "status": xml.status,
                        "statusText": xml.statusText
                    })
                }
            }
        }
        
        xml.open(method, url, async);
        if (data) {
            xml.setRequestHeader("Content-Type", "Application/json")
            xml.send(JSON.stringify(data));
        }
        else {
            xml.send();
        }
        
    })
}
