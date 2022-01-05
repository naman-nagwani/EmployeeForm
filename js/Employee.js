class Employee {

    constructor() {
        
    }

    get id() {
        return this.idValue;
    }

    set id(id) {
        this.idValue = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        let namePattern = RegExp("^[A-Z][a-z A-Z]{2,}$");
        console.log("setting name");
        if(!namePattern.test(name)) {
            throw "Invalid Name";
        }
        else {
            this._name = name;
        }
    }

    get email() {
        return this.emailValue;
    }

    set email (email) {
        let emailPattern = RegExp("^[\\w+-]+(\\.[\\w-]+)*@[^_\\W]+(\\.[^_\\W]+)?(?=(\\.[^_\\W]{3,}$|\\.[a-zA-Z]{2}$)).*$")

        if( !emailPattern.test(email)) {
            throw "Invalid Email";
        }
        else {
            this.emailValue = email;
        }
    }

    get phone() {
        return this.phoneValue;
    }

    set phone(phone) {
        let phonePattern = RegExp("^[0-9]{1,3}[\\s][0-9]{10}$");

        if (!phonePattern.test(phone)) {
            throw "Invalid Phone pattern";
        }
        else {
            this.phoneValue = phone;
        }
    }

    get password() {
        return this.pwdValue;
    }

    set password(password) {
        let pwdPattern = RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=[^_\\W]*[_\\W][^_\\W]*$).{8,}$");

        if( !pwdPattern.test(password)) {
            throw "Invalid password"
        }
        else {
            this.pwdValue = password;
        }

    }

    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) { this._profilePic = profilePic }

    get gender() { return this._gender}
    set gender(gender) { this._gender = gender }

    get salary() { return this._salary}
    set salary(salary) {this._salary = salary}

    get startDate() { return this._startDate}
    set startDate(startDate) {

        let date = startDate.split("-");
        let today = new Date();
        let userDate = new Date(date[2], date[1] - 1, date[0]);
        
        var diff = (today.getTime() - userDate.getTime() );
        if( diff < (30 * 24 * 60 * 60 * 1000) && diff > 0 ) {
            this._startDate = startDate;
        }
        else {
            throw "Invalid date";
        }
    }

    get department() { return this._department}
    set department(department) {this._department = department}

    get notes() { return this._notes;}
    set notes(notes) {this._notes = notes;}

}