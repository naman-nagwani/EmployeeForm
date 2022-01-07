const getURL = "http://localhost:3000/employees";
const postURL = "http://localhost:3000/employees";
const deleteURL = "http://localhost:3000/employees/";

window.addEventListener("load", () => {

    // We're making a get call to the server
    makeAjaxCall("GET", getURL)
        .then( (response) => {
            let div = document.querySelector('.get span');
            div.innerHTML = response;
        })
        .catch( (rejected) => {
            console.log(rejected);
        });
})

function deleteEmp() {
    // We're deleting the employee with id 1
    makeAjaxCall("DELETE", deleteURL + 1)
    .then( (response) => {
        let div = document.querySelector('.delete span');
        div.innerHTML = response;
    })
    .catch( (rejected) => {
        console.log(rejected);
    });
}

function postEmp() {

    // We're creating a dummy object to post into the server
    console.log(" create new emp dummy");
    newEmployeeData = {
        "Name": "Harry Potter",
        "id": 3,
        "Salary": 4789
    }   

    // We now call post into the server with the data we made up
    makeAjaxCall("POST", postURL, newEmployeeData)
    .then( (response) => {
        console.log(" handling response");
        let div = document.querySelector('.post span');
        div.innerHTML = response;
    })
    .catch( (rejected) => {
        console.log(rejected);
    });
}
