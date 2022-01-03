window.addEventListener("load", () => {
    let salary = document.querySelector("salary");
    let salaryValue = document.querySelector("#salary");

    
    salaryValue.addEventListener("input", () => {
        salary.textContent = salaryValue.value;
    })
})

function saveForm() {

    let employee = new Employee;

    try {
        employee.name = document.querySelector("#name").value;

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

        employee.startDate = day + "-" + month + "-" + year;

        let department = [];
        document.getElementsByName('department').forEach( (element) => {
            if (element.checked == true) {
                department.push(element.value)
            }
        });
        employee.department = department;        

    } catch (invalidName) {
        console.log(invalidName);
    }

    console.log(" saved " + employee.startDate);
    
}

function submitForm() {
    console.log("submiting");
    window.location = "/html/home.html";
}

