window.addEventListener("DOMContentLoaded", (event) => {

    let xml = new XMLHttpRequest();
    let result = null;

    xml.onreadystatechange = () => {
        console.log(xml.readyState + ": " + xml.status);
        if (xml.readyState == 4) {
            if (xml.status.toString().match("^[2][0-9]{2}$")) {
                result = JSON.parse(xml.response);
                createHomeHTML(result);
            }

            else if (xml.status.toString().match("^[45][0-9]{2}$")) {
                console.log(" ERROR in the 3-400 range");
            }
 
            else {
                console.log(" ERROR in some unknown thing");
            }

        }
    }

    xml.open("GET", "http://localhost:3000/employeeData");
    xml.send();


    // console.log(xml);

    // createHomeHTML();
    // console.log(getEmpDataFromStorage());
})

const getEmpDataFromStorage = () => {
    let storage = window.localStorage;
    return storage.getItem("empData") ? JSON.parse(storage.getItem("empData")) : [];
}

const createHomeHTML = (empList) => {
    
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
    for (const empPayrollData of empPayrollDataList) {
        console.log(empPayrollData.department);

        let departmentHtml = ``;

        if(empPayrollData.department) { 
            for (const dep of empPayrollData.department) {
                departmentHtml += `
                    <span class="department-chip">${dep}</span>`
            }
        }

        let finalDate = ``;
        if (empPayrollData.startDate) {
            let date = empPayrollData.startDate.split("-");
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
                <i class="material-icons">delete</i>
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