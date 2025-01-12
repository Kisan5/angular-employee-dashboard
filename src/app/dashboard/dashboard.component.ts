import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppModuleServiceService } from '../services/app-module-service.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  //ReactiveForms Implementation -s
  imports: [CommonModule, FormsModule, ReactiveFormsModule], //kisan: to use ngFor need to add commonModule
  //kisan: to use [(ngModel)] in HTML element need to import FormsModule from @angular/forms.
  //To use [formGroup], [formControl], formControlName (note: formControlName is without braces), (ngSubmit) like properties in HTML element we need to import ReactiveFormsModule.
  //ReactiveForms Implementation -e
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  respondedEmployeeRecordsArray: any;
  appService: AppModuleServiceService;
  //ReactiveForms Implementation -s
  //Form data Connect - start
    // fName: String;
    // lName: String;
    // email: String;
    // mobile: String; //kisan: made this string because can perform string operation on it if required
    // salary: String;
  
  //Reactive Form connection
  //way 1 (only formControl)
  // fName: FormControl;
  
  //way 2 (FormGroup)
  addEmployeeForm : FormGroup;
  //ReactiveForms Implementation -e
  //Form data Connect - end

  /* 
  //Note: if dont want to initialize the varible in declaration so can use bang colon, but initializing in constructor so commented it
  employeeObj !: EmployeeModel; //kisan: use of !: https://stackoverflow.com/questions/58073841/bang-colon-notation-in-angular
  //kisan: if in tsconfig.json strict is enabled then we need to initialize the variable or can use above way
  */
  employeeObj: EmployeeModel; //employee object to use in post api to pass the details

  constructor(appService: AppModuleServiceService, fb: FormBuilder) {
    //ReactiveForms Implementation -s
    //initializing the varibles to empty as in strict mode displays error
      // this.fName = '';
      // this.lName = '';
      // this.email = '';
      // this.mobile = '';
      // this.salary = '';
      //ReactiveForms Implementation -e
    this.appService = appService;
    this.employeeObj = new EmployeeModel();
    // this.getEmployees(); //kisan: Moved this call to ngOnInit. check the reason there.

    //ReactiveForms Implementation -s
    //Way 1 (only formControl)
    //kisan- Direct instead of using [(ngModel)] we can use "formControl" to work the same like [(ngModel)]. For this to work we can use [formControl]="varName" in HTML and varName = new FormControl(''); in "component ts" file to connect. Note: [formControl] property use in HTML requires the ReactiveFormsModule to be imported in imports [] at the top, where as ts file use of "formControl" keyword can be used by simple import from "@angular/forms" at top check.
    // this.fName = new FormControl('');

    //Way 2 (FormGroup)
    //Using FormGroup to connect a group of HTML elements to a single variable instead of creating multiple formControl/ngModel variables.
    // this.addEmployeeForm = new FormGroup({ 
    //   //kisan: This "formGroup" and "formControl" is used in "component ts" file can be used only via import "FormGroup", "FormControl" from "@angular/forms", but anything which is being used in HTML (like [(ngModel)], [formGroup] etc.) for that we need to import the respective module in imports array[] at the top. i.e. to use [formControl], [formGroup] etc. we need to import ReactiveFormsModule. By Reactive Form, we will connect HTML form with the variable here in ts which will require [formGroup]="formGroupVariableName" property in html that requires ReactiveFormsModule to be imported in imports section.
    //   // Note: To use formGroup we need to add to properties in HTML. i.e. [formGroup] for the forms connect to here formGroup variable and formControlName (note: formControlName is without braces) to connect the variables with the variables present inside this formGroup. Observe: here formControlName used instead of [formControl] as used in way 1.
    //   fName : new FormControl(''),  //kisan: this name of variable should be same as variable name provided as [formControl]="varName" in HTML element. Also the passed string is the default value to be put in that element at start.
    //   lName : new FormControl(''),
    //   email : new FormControl(''),
    //   mobile : new FormControl(''),
    //   salary : new FormControl('')
    // });

    //Way 3 (uses of FormGroup with FormBuilder service)
    //kisan: note: here by using formBuilder we can directly build formGroup by putting values instead of writing new formControl('') again and again.
    this.addEmployeeForm = fb.group({
      fName : [''], //kisan: here we can use direct '' OR new formControl('') also
      lName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    });
    //kisan: Some basic operations on formGroup -s
    /*
    console.log(this.addEmployeeForm.value); //prints a object consisting all the formcontrol variable in it
    console.log(this.addEmployeeForm.value.fname); //gives us the specific formcontrol variable value
    console.log(this.addEmployeeForm.valid); //checks and return true if satisfing all the constraints applied on the fields. 
    console.log(this.addEmployeeForm.get('fName')); gives the particular formControl object of fName.
    console.log(this.addEmployeeForm.get('fName')?.value); gives fName value.
    //example of using setValue (used to change all values) and patchValue (used to change individual value only)
    this.addEmployeeForm.setValue({  //by this need to update all the properties with some value.
      fName: "example",
      lName: "example",
      email: "example",
      mobile: "example",
      salary: "example"
    })
    this.addEmployeeForm.patchValue({ //by patchValue can changed needed properties only
      fName: "ex", 
      mobile: "ex",
      salary: "ex"
    })
    */
    //kisan: Some basic operations on formGroup -e
  //ReactiveForms Implementation -e
  }
  ngOnInit() {
    this.getEmployees(); //kisan: Moved this call to ngOnInit as it is a perfect place for initialization though we can use constructor also as both works the same, but constructor is a typescript thing and ngOnInit is a angular thing. so better to use angular things for these tasks and also the @input properties and all would be available in this component at this ngOnInit call time only.

    // this.createEmployee(); //kisan: doubt when i am calling this post api call method from here OR from the constructor by passing a dummy object though api call code is hitting in debugger once, but in db 2 records are getting created. Need to check why as if i add it in a button click then one record is getting created.
  }
  getEmployees() {
    this.appService
      .getEmployees()
      .subscribe((item) => (this.respondedEmployeeRecordsArray = item));
  }
  createEmployee() {
    this.assignValueToEmpObj();
    this.appService.createEmployee(this.employeeObj).subscribe(
      (item) => {
        alert('Employee added successfully.');
        this.getEmployees();
        document.getElementById('closePopup')?.click(); //kisan: ?. is used to prevent if the Object is possibly 'null' and no element present like closePopup then to handle that. As strict is true so this error thorwn to add this ? :
      },
      (err) => {
        alert('Something went wrong.');
      }
    );
    // this.appService.createEmployee(this.employeeObj).subscribe((item) => alert('OK')); // kisan: 2nd way of subscribe
    // this.appService.createEmployee(JSON.stringify(this.employeeObj)); //kisan: we can use JSON.stringify to convert it to a json and send in the post call or else can send the epmloyee object direct.
  }
  //used this function for assigning value to employee object from the form field variables
  assignValueToEmpObj() {
    // this.employeeObj.firstName = this.fName;
    // this.employeeObj.lastName = this.lName;
    // this.employeeObj.email = this.email;
    // this.employeeObj.mobile = this.mobile;
    // this.employeeObj.salary = this.salary;
    //ReactiveForms Implementation -s
    this.employeeObj.firstName = this.addEmployeeForm.value.fName;
    this.employeeObj.lastName = this.addEmployeeForm.value.lName;
    this.employeeObj.email = this.addEmployeeForm.value.email;
    this.employeeObj.mobile = this.addEmployeeForm.value.mobile;
    this.employeeObj.salary = this.addEmployeeForm.value.salary;
    //ReactiveForms Implementation -e
  }
  //used to clear the different modals fields in same function. will use if needed future reference
  // clearFormFields(bootstrapModalName: String) {
  // switch (bootstrapModalName) {
  //   case 'addEmployee':
  //     this.fName = '';
  //     this.lName = '';
  //     this.email = '';
  //     this.mobile = '';
  //     this.salary = '';
  //     break;
  // }
  clearFormFields() {
    // this.fName = '';
    // this.lName = '';
    // this.email = '';
    // this.mobile = '';
    // this.salary = '';
    //ReactiveForms Implementation -s
    //kisan: note reset form fields in ReactiveForms
    //way 1
    // this.addEmployeeForm.value.fName = '';
    //way 2
    // this.addEmployeeForm.get('fName')?.reset();
    //way 3 (resets all fields value)
    this.addEmployeeForm.reset();
    //ReactiveForms Implementation -e
  }
}
