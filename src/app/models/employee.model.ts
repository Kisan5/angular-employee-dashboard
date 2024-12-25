export class EmployeeModel{
    /*
    firstName !: String; //kisan: use of !: https://stackoverflow.com/questions/58073841/bang-colon-notation-in-angular
    //kisan: if in tsconfig.json strict is enabled then we need to initialize the variable or can use above way
    */

    //either can create properties in above way OR below approach by createing constructor and initializing there
    firstName : String;
    lastName : String;
    email : String;
    mobile : String;
    salary : String;
    constructor(){
        this.firstName="";
        this.lastName="";
        this.email="";
        this.mobile="";
        this.salary="";
    }
}

/*
//Kisan: best way to create a model is using interfaces. but it can be used to create reference varible which can store the object with similar properties and all. but cant use to create objects and assign values in interface to send in post. so class is a better option for now

export interface EmployeeModel{
    firstName : String;
    lastName : String;
    email : String;
    mobile : String;
    salary : String;
}
    */