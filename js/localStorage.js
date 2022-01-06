const getLocalEmployeeData = (parse = true, key = "empData") => {

    if (parse == true) {
        return JSON.parse( window.localStorage.getItem(key) );
    }
    else {
        return window.localStorage.getItem(key)
    }
}

const setLocalEmployeeData = (key = "empData", value) => {
    window.localStorage.setItem(key, JSON.stringify(value) );
}