import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isenabledashboard: boolean = false;

  constructor(private http: HttpClient) { }


  login(email: any, password: any): Observable<any> {
    return this.http.post(`/api/users/login`, { email, password });
  }

  register(name: any, email: any, password: any): Observable<any> {
    return this.http.post(`/api/users/register`, { name, email, password });
  }
}
