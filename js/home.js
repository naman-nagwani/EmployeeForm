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

    innerHtml +=  `
    <tr>
        <td></td>
        <td>David</td>
        <td>Male</td>
        <td>
            IT
            HR
        </td>
        <td>12456789</td>
        <td>01 Jan 2022</td>
        <td>
            <i class="material-icons">delete</i>
            <i class="material-icons">edit</i>
        </td>
    </tr>`;
    
    document.querySelector("#employee-table").innerHTML = innerHtml;
}

const addUser = () => {
    window.location = "./employeeForm.html";
}