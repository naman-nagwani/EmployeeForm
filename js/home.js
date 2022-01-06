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
        return;
    }
    else {
        console.log(" its not empty ");
        empData = localStorage.getItem("empData")
    }

    console.log(JSON.parse(empData) );
    for (const emp of JSON.parse(empData).employees) {
        console.log("emp: " + emp);

        console.log(emp._name);
        console.log(emp._department);

        let image = ``;
        if (emp._profilePic) {
            image = "../assets/profile-images/" + emp._profilePic + ".png";
        }

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
                <i class="material-icons">delete</i>
                <i class="material-icons">edit</i>
            </td>
        </tr>`;
        
    }

    document.querySelector("#employee-table").innerHTML = innerHtml;
}

const addUser = () => {
    window.location = "./employeeForm.html";
}