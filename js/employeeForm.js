let employee = new Employee;

window.addEventListener("load", () => {
    let salary = document.querySelector("salary");
    let salaryValue = document.querySelector("#salary");
    let name = document.querySelector("#name");
    
    salaryValue.addEventListener("input", () => {
        salary.textContent = salaryValue.value;
    })
    
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

function saveForm() {
    
    let profile = document.querySelector('input[name="profile-choice"]:checked');
    if (profile != null) {
        employee.profilePic = profile.value;
    }
    
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null) {
        employee.gender = gender.value;
    }
    
    employee.salary = document.querySelector('#salary').value;
    employee.notes = document.querySelector('#notes').value;
    
    let department = [];
    document.getElementsByName('department').forEach( (element) => {
        if (element.checked == true) {
            department.push(element.value)
        }
    });
    employee.department = department;     
    employee.id = new Date().getTime();   
    
    let day = document.querySelector('select[name=Day]').value;
    let month = document.querySelector('select[name=Month]').value;
    let year = document.querySelector('select[name=Year]').value;
    let errorDate = document.querySelector("#error-date");
    console.log(day + "-" + month + "-" + year);  
    try {
        employee.startDate = day + "-" + month + "-" + year;  
        errorDate.textContent = "";

        let errorName = document.querySelector('#error-name');
        if (errorName.textContent != "")
            return;
        let localStorage = window.localStorage;
        localStorage.setItem(employee.id, JSON.stringify(employee) );
        console.log(" saved " + localStorage.getItem(employee.id));
        
        submitForm(employee);
    } catch (invalidDate) {
        errorDate.textContent = invalidDate;
    }
    
    
}

function submitForm(employee) {

    connectWithJsonServer("POST", "http://localhost:3000/employeeData", null, true, employee);

    console.log("submiting");
    window.location = "/html/home.html";
}

function clearForm() {
    console.log("clearing local memory too");
    window.localStorage.clear();
    window.location = "/html/home.html";
}