import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppModuleServiceService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getEmployees(): Observable<any> {
    return this.http.get('http://localhost:3000/employees');
  }
}
