window.addEventListener("load", () => {

    //createHomeHtml();
})

const createHomeHtml = () => {

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

    // Initialize local storage if it doesn't exist already
    // let localStorage = window.localStorage;
    let empData;

    if (getLocalEmployeeData(false) == null) {
        console.log(" its empty");
        document.querySelector("#employee-table").innerHTML = innerHtml;
        return;
    }
    else {
        console.log(" its not empty ");
        empData = getLocalEmployeeData(false)
    }

    let empList = JSON.parse(empData).employees;
    console.log(empList);
    for (const emp of empList) {
        console.log("emp: " + emp);

        console.log(emp._name);
        console.log(emp._department);

        let image = ``;
        if (emp._profilePic) {
            image = "../assets/profile-images/" + emp._profilePic + ".png";
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
                <span class="department-chip">${emp._department[0]}</span>
                <span class="department-chip">${emp._department[1]}</span>
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