function first() {
    console.log(" calling second function at " + new Date().getMinutes() + "." + new Date().getSeconds());
    setTimeout(() => {
        second();
    }, 2000);
}

function second() {
    console.log(" Second called at " + new Date().getMinutes() + "." + new Date().getSeconds());
}

console.log(" calling first at " + new Date().getMinutes() + "." + new Date().getSeconds());
first();
console.log(" stuff happening in the meanwhile...");