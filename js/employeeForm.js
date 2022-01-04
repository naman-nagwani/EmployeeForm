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
    
    let day = document.querySelector('select[name=Day]').value;
    let month = document.querySelector('select[name=Month]').value;
    let year = document.querySelector('select[name=Year]').value;
    let errorDate = document.querySelector("#error-date");
    console.log(day + "-" + month + "-" + year);  
    try {
        employee.startDate = day + "-" + month + "-" + year;  
        errorDate.textContent = "";
    } catch (invalidDate) {
        errorDate.textContent = invalidDate;
    }

    let department = [];
    document.getElementsByName('department').forEach( (element) => {
        if (element.checked == true) {
            department.push(element.value)
        }
    });
    employee.department = department;     
    employee.id = new Date().getTime();   

    let localStorage = window.localStorage;
    localStorage.setItem(employee.id, JSON.stringify(employee) );
    console.log(" saved " + localStorage.getItem(employee.id));
    
}

function submitForm() {
    console.log("submiting");
    window.location = "/html/home.html";
}
function clearForm() {
    console.log("submiting");
    window.localStorage.clear();
}

