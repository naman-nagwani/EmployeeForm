const postURL = "http://localhost:3000/employees";
const getURL = "http://localhost:3000/employees";
const updateURL = "http://localhost:3000/employees/";
let employee = new Employee();


window.addEventListener("load", () => {
    
    // console.log("raw data: " + getLocalEmployeeData(false, "empData"));
    let salary = document.querySelector("salary");
    let salaryValue = document.querySelector("#salary");
    let name = document.querySelector("#name");


    // Display salary value next to slider
    salaryValue.addEventListener("input", () => {
        salary.textContent = salaryValue.value;
    })
    
    // Set name in object or display error message
    name.addEventListener("input", () => {
        let errorName = document.querySelector('#error-name');
        try {
            employee.name = name.value;
            errorName.textContent = "";
        } catch (invalidName) {
            errorName.textContent = invalidName;
        }
    })

    let checkUpdate = getLocalEmployeeData(true, "update")
    console.log("update on load: " + checkUpdate.update[0]);

    // Fill up the fields if the update value is true in the local storage
    if (checkUpdate.update[0] == true) {

        makeAjaxCall("GET", getURL)
        .then( (response) => {
            updateForm(response, checkUpdate);
        })

    }
    
    // console.log("raw data: " + getLocalEmployeeData(false));
})

// Called when the submit button is clicked
function saveForm() {

    console.log(" update: " + getLocalEmployeeData(true, "update").update[0]);
    
    // Set a unique value for id
    employee.id = new Date().getTime();
    
    // Set the profile picture value
    let profile = document.querySelector('input[name="profile-choice"]:checked');
    if (profile != null) {
        employee.profilePic = profile.value;
    }
    
    // Set the gender value
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null) {
        employee.gender = gender.value;
    }
    
    // Set the salary and notes values
    employee.salary = document.querySelector('#salary').value;
    employee.notes = document.querySelector('#notes').value;
    
    // Set the department as a list of values
    let department = [];
    document.getElementsByName('department').forEach( (element) => {
        if (element.checked == true) {
            department.push(element.value)
        }
    });
    employee.department = department;     

    // Set the employee id as a unique value here
    employee.id = new Date().getTime();   
    
    // We initialize the date string here
    let day = document.querySelector('select[name=Day]').value;
    let month = document.querySelector('select[name=Month]').value;
    let year = document.querySelector('select[name=Year]').value;
    let errorDate = document.querySelector("#error-date");
    console.log(day + "-" + month + "-" + year);  

    // We try to set the name and date values here. If they don't fit the condition they will throw an error
    try {
        employee.startDate = day + "-" + month + "-" + year;  
        errorDate.textContent = "";

        employee.name = document.querySelector("#name").value;
        let errorName = document.querySelector('#error-name');
        if (errorName.textContent != "") {
            return;
        }

        if (getLocalEmployeeData(true, "update").update[0] == true) {
            // delete this record so we can enter the replacement record
            //deleteEmployee(getLocalEmployeeData(true, "update").update[1], empList, getLocalEmployeeData());
            let updateIndex = getLocalEmployeeData(true, "update").update[1]
            console.log(" WE are saving the updated form");
            makeAjaxCall("PUT", updateURL + updateIndex, employee)
                .then( () => {
                    window.location = "/html/home.html";
                });
    
            // Reset the update flag in the local storage
            setLocalEmployeeData("update", {"update": [false] } );
            return;
        }

        makeAjaxCall("POST", postURL, employee)
            .then( () => {
                window.location = "/html/home.html";
            });
        // This function is for saving on local storage
        //submitForm(employee);
    } catch (invalidDate) {
        errorDate.textContent = invalidDate;
    }
    
    
}

// This function is called when the cancel button is clicked. We redirect back to the home page.
function clearForm() {

    // Reset the update flag in the local storage
    setLocalEmployeeData("update", {"update": [false] } );
    
    window.location = "/html/home.html";
}

function updateForm(empData, checkUpdate) {
    console.log(" We are updating");

    let salary = document.querySelector("salary");
    let salaryValue = document.querySelector("#salary");
    let name = document.querySelector("#name");

    let empList = JSON.parse(empData);
    let updateIndex = empList.findIndex((element) => element.id == checkUpdate.update[1])
    let updateEmployee = empList[updateIndex];

    // console.log(" value = " + updateEmployee._startDate );

    // Set the original value of the attributes
    name.value = updateEmployee._name;  

    let profileChoice = 'input[value="' + updateEmployee._profilePic + '"]';
    document.querySelector(profileChoice).checked = true;
    
    let genderChoice = 'input[value="' + updateEmployee._gender + '"]';
    document.querySelector(genderChoice).checked = true;

    for (const dept of updateEmployee._department) {
        let departmentChoice = 'input[value="' + dept + '"]';
        document.querySelector(departmentChoice).checked = true;
    }

    salaryValue.value = updateEmployee._salary;
    salary.textContent = updateEmployee._salary;

    let date = updateEmployee._startDate.split("-");
    document.querySelector('select[name=Day]').value = date[0];
    document.querySelector('select[name=Month]').value = date[1];
    document.querySelector('select[name=Year]').value = date[2];

    document.querySelector('#notes').value = updateEmployee._notes;
}