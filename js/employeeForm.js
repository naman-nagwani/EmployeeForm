window.addEventListener("load", () => {
    let salary = document.querySelector("salary");
    let salaryValue = document.querySelector("#salary");

    salaryValue.addEventListener("input", () => {
        salary.textContent = salaryValue.value;
    })
})