window.addEventListener("load", () => {

    createHomeHtml();
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
    let localStorage = window.localStorage;
    let empData;

    if (localStorage.getItem("empData") == null) {
        console.log(" its empty");
        document.querySelector("#employee-table").innerHTML = innerHtml;
        return;
    }
    else {
        console.log(" its not empty ");
        empData = localStorage.getItem("empData")
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

        let deleteFunction = "deleteEmployee(" + emp._id + ", " + JSON.stringify(empList) + ", " + empData + ")";

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
                <i class="material-icons">edit</i>
            </td>
        </tr>`;
        
    }

    document.querySelector("#employee-table").innerHTML = innerHtml;
}

const addUser = () => {
    window.location = "./employeeForm.html";
}

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

    createHomeHtml();

}