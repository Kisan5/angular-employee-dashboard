import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppModuleServiceService } from '../services/app-module-service.service';
import { FormsModule } from '@angular/forms';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], //kisan: to use ngFor need to add commonModule
  //kisan: to use [(ngModel)] need to import FormsModule from @angular/forms.
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  respondedEmployeeRecordsArray: any;
  appService: AppModuleServiceService;

  //Form data Connect - start
  fName: String;
  lName: String;
  email: String;
  mobile: String; //kisan: made this string because can perform string operation on it if required
  salary: String;
  //Form data Connect - end

  /* 
  //Note: if dont want to initialize the varible in declaration so can use bang colon, but initializing in constructor so commented it
  employeeObj !: EmployeeModel; //kisan: use of !: https://stackoverflow.com/questions/58073841/bang-colon-notation-in-angular
  //kisan: if in tsconfig.json strict is enabled then we need to initialize the variable or can use above way
  */
  employeeObj: EmployeeModel; //employee object to use in post api to pass the details

  constructor(appService: AppModuleServiceService) {
    //initializing the varibles to empty as in strict mode displays error
    this.fName = '';
    this.lName = '';
    this.email = '';
    this.mobile = '';
    this.salary = '';
    this.appService = appService;
    this.employeeObj = new EmployeeModel();
    // this.getEmployees(); //kisan: Moved this call to ngOnInit. check the reason there.
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
    this.employeeObj.firstName = this.fName;
    this.employeeObj.lastName = this.lName;
    this.employeeObj.email = this.email;
    this.employeeObj.mobile = this.mobile;
    this.employeeObj.salary = this.salary;
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
    this.fName = '';
    this.lName = '';
    this.email = '';
    this.mobile = '';
    this.salary = '';
  }
}
