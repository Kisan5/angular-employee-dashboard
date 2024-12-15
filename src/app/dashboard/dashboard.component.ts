import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], //kisan: to use ngFor need to add commonModule
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  http!:HttpClient;
  respondedEmployeeRecordsArray: any;

  constructor(http:HttpClient){
    this.http=http;
    this.getEmployees();
  }
  getEmployees(){
    this.http.get("http://localhost:3000/employees").subscribe(item => this.respondedEmployeeRecordsArray=item);
  }
}
