import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class AppModuleServiceService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getEmployees(): Observable<any> { //kisan: here also can use- this.http.get<EmployeeModel> and Observable<EmployeeModel> but need to check the rest flows like where value stored and all etc.
    return this.http.get('http://localhost:3000/employees');
  }
  createEmployee(emp : EmployeeModel) : Observable<any> { //kisan: here the post api call returns the observables of any type so return type is same. if you write like Observable<EmployeeModel> Or something then error as it return a default any type. to specify which class object it returns then we can add the generics with post call and return type also like check below code.// return this.http.post<EmployeeModel>('http://localhost:3000/employees',emp); AND return type: createEmployee(emp : EmployeeModel) : Observable<EmployeeModel>//
    return this.http.post('http://localhost:3000/employees',emp);
  }
}
