import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppModuleServiceService } from '../services/app-module-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], //kisan: to use ngFor need to add commonModule
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  respondedEmployeeRecordsArray: any;
  appService:AppModuleServiceService;
  constructor(appService:AppModuleServiceService){
    this.appService=appService;
    this.getEmployees();
  }
  getEmployees(){
    this.appService.getEmployees().subscribe(item => this.respondedEmployeeRecordsArray=item);
  }
}
