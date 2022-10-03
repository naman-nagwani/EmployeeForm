// This is to delete locally
const deleteEmployee = (id, array, empData) => {    
    console.log("trying to delete something");
    console.log(" trying to delete employee " + id);

    let deleteIndex = array.findIndex((element) => element._id == id)
    console.log(" The object to delete: " + deleteIndex);

    array.splice(deleteIndex, 1);
    console.log(array);

    empData.employees = array;

    console.log("new emp");
    console.log(empData);

    localStorage.setItem("empData", JSON.stringify(empData) );

    // createHomeHtml();
}

// This function is called by the saveForm() function if the attributes are valid.
// We add the employee object to the local storage
function submitForm(employee) {
    
    // let localStorage = window.localStorage;
    
    let empDataTemp = getLocalEmployeeData(false) == null ? {"employees": []} : getLocalEmployeeData();

    console.log("emp");
    console.log("data: " + JSON.stringify(empDataTemp));

    empDataTemp.employees.push(employee );

    console.log("new emp");
    console.log(empDataTemp);

    setLocalEmployeeData("empData", empDataTemp)
    // localStorage.setItem("empData", JSON.stringify(empDataTemp) );
    console.log(" saved " + getLocalEmployeeData());

    // Redirect back to the home page once we're done saving into local storage
    window.location = "/html/home.html";
}

const deleteURL = "http://localhost:3000/employees/";

const deleteEmployeeAjax = (id) => {
    makeAjaxCall("DELETE", deleteURL + id)
        .then( (response) => {
            console.log("DELETED" + response);
            window.location = "/html/home.html";
        })
}