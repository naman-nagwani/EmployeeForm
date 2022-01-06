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

    for (const emp of dummyJson.employeeData) {
        
        innerHtml +=  `
        <tr>
            <td></td>
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

const dummyJson = {
    "employeeData": [
        {
            "_name": "David B Alapat",
            "_gender": "M",
            "_department": [
              "Admin",
              "HR"
            ],
            "_salary": 120000,
            "_startDate": "03-01-2022",
            "_profilePic": "Ellipse-1",
            "id": 1
          },
          {
            "_name": "John Doe",
            "_gender": "M",
            "_department": [
              "IT",
              "HR"
            ],
            "_salary": 100000,
            "_startDate": "02-01-2022",
            "_profilePic": "Ellipse-2",
            "id": 2
          },
    ]
}