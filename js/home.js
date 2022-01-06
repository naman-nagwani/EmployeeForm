window.addEventListener("DOMContentLoaded", (event) => {

    connectWithJsonServer("GET", "http://localhost:3000/employeeData", createHomeHTML);
    
})


const getEmpDataFromStorage = () => {
    let storage = window.localStorage;
    return storage.getItem("empData") ? JSON.parse(storage.getItem("empData")) : [];
}

const createHomeHTML = (empList) => {
    
    console.log("in the callback function");
    let empPayrollDataList = empList;
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let storage = window.localStorage;
    storage.setItem("empData", JSON.stringify(empPayrollDataList) );

    const headerInnerHtml = `
    <tr>
        <th></th>
        <th>NAME</th>
        <th>GENDER</th>
        <th>DEPARTMENT</th>
        <th>SALARY</th>
        <th>START DATE</th>
        <th>ACTIONS</th>
    </tr>`;

    
    let innerHtml = `${headerInnerHtml}`;
    let id = 0;
    for (const empPayrollData of empPayrollDataList) {
        id += 1;
        let departmentHtml = ``;

        if(empPayrollData._department) { 
            for (const dep of empPayrollData._department) {
                departmentHtml += `
                    <span class="department-chip">${dep}</span>`
            }
        }

        let finalDate = ``;
        if (empPayrollData._startDate) {
            let date = empPayrollData._startDate.split("-");
            finalDate = date[0] + " " + months[date[1] - 1] + " " + date[2];
        }

        let image = ``;
        if (empPayrollData._profilePic) {
            image = "../assets/profile-images/" + empPayrollData._profilePic + ".png";
        }

        innerHtml +=  `
        <tr>
            <td><img src=${image}></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender == "M" ? "Male" : "Female"}</td>
            <td>
                ${departmentHtml}
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${finalDate}</td>
            <td>
                <i class="material-icons" onclick="deleteEmployee(${empPayrollData.id})">delete</i>
                <i class="material-icons">edit</i>
            </td>
        </tr>`;
    
    }


    
    document.querySelector("#employee-table").innerHTML = innerHtml;
}

const addUser = () => {
    console.log("hi there");
    window.location = "./employeeForm.html";
}

function deleteEmployee(id) {    
    console.log(" trying to delete employee " + id);
    let empRecord = "http://localhost:3000/employeeData/" + id;
    connectWithJsonServer("delete", empRecord, (response) => {console.log("deleted " + response);})
}