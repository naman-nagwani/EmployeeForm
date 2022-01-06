
let employee = new Employee;

window.addEventListener("load", () => {
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
})

// Called when the submit button is clicked
function saveForm() {

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

        let errorName = document.querySelector('#error-name');
        if (errorName.textContent != "") {
            return;
        }
        
        submitForm(employee);
    } catch (invalidDate) {
        errorDate.textContent = invalidDate;
    }
    
    
}

// This function is called by the saveForm() function if the attributes are valid.
// We add the employee object to the local storage
function submitForm(employee) {
    
    let localStorage = window.localStorage;
    let empDataTemp = localStorage.getItem("empData") == null ? {"employees": []} : JSON.parse( localStorage.getItem("empData") );

    console.log("emp");
    console.log(empDataTemp);

    empDataTemp.employees.push(employee );

    console.log("new emp");
    console.log(empDataTemp);

    localStorage.setItem("empData", JSON.stringify(empDataTemp) );
    console.log(" saved " + localStorage.getItem("empData"));

    // Redirect back to the home page once we're done saving into local storage
    window.location = "/html/home.html";
}

// This function is called when the cancel button is clicked. We redirect back to the home page.
function clearForm() {
    window.location = "/html/home.html";
}