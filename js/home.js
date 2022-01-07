
const getURL = "http://localhost:3000/employees";
const deleteURL = "http://localhost:3000/employees/";
const updateURL = "http://localhost:3000/employees/";

window.addEventListener("load", () => {

    makeAjaxCall("GET", getURL)
        .then( (response) => {
            createHomeHtml(response);
        })
        // .catch( (rejected) => {
        //     console.log(" ERROR: " + rejected);
        //     console.log(" ERROR: " + rejected.status + ": " + rejected.statusText);
        //     return;
        // });
})

const createHomeHtml = (empData) => {

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

    if (empData == null) {
        console.log(" its empty");
        console.log(empData);
        document.querySelector("#employee-table").innerHTML = innerHtml;
        return;
    }
    else {
        console.log(" its not empty ");
        console.log(JSON.parse(empData));
    }

    let empList = JSON.parse(empData);
    for (const emp of empList) {
        console.log("emp: " + JSON.stringify(emp));

        // console.log(emp._name);
        // console.log(emp._department);

        let image = ``;
        if (emp._profilePic) {
            image = "../assets/profile-images/" + emp._profilePic + ".png";
        }

        let department = ``;
        for (const dept of emp._department) {
            department += `
            <span class="department-chip">${dept}</span>
            `
        }

        let deleteFunction = "deleteEmployee(" + emp._id + ", " + JSON.stringify(empList) + ", " + empData + "); createHomeHtml();";
        let editFunction = "editEmployee(" + JSON.stringify(emp) + ", " + empData + ")";

        // console.log("edit function: " + editFunction);
        innerHtml +=  `
        <tr>
            <td><img src=${image}></td>
            <td>${emp._name}</td>
            <td>${emp._gender}</td>
            <td>
                ${department}
            </td>
            <td>${emp._salary}</td>
            <td>${emp._startDate}</td>
            <td>
                <i class="material-icons" onclick='${deleteFunction}'>delete</i>
                <i class="material-icons" onclick='${editFunction}'>edit</i>
            </td>
        </tr>`;
        
    }

    document.querySelector("#employee-table").innerHTML = innerHtml;
}

const addUser = () => {
    // Reset the update flag in the local storage
    //setLocalEmployeeData("update", {"update": [false]})
    // window.localStorage.setItem("update", JSON.stringify({"update": [false]}));

    window.location = "./employeeForm.html";
}

const editEmployee = (element, empData) => {

    //setLocalEmployeeData("update", {"update": [true, element._id]})
    // window.localStorage.setItem("update", JSON.stringify({"update": [true, element._id]}));
    window.location = "./employeeForm.html";
}