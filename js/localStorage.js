const getLocalEmployeeData = () => {

    return JSON.parse( window.localStorage.getItem("empData") );
}