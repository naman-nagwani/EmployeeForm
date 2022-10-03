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

const deleteURL = "http://localhost:3000/employees/";

const deleteEmployeeAjax = (id) => {
    makeAjaxCall("DELETE", deleteURL + id)
        .then( (response) => {
            console.log(response);
            window.location = "/html/home.html";
        })
}