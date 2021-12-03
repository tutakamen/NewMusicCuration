import { environment } from './../environments/environment';
import {User} from './user';
import {RegisterUser} from './register-user';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
// import { AnyPtrRecord } from 'dns';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor( private http: HttpClient) { }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public readToken(): User | null {
    const token = localStorage.getItem('access_token');

    if (token) {
      return helper.decodeToken(token)
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Note: We can also use helper.isTokenExpired(token) 
    // to see if the token is expired 
    //TRY REMOVE HELPER FORM IF if service not working 
    if (token && !helper.isTokenExpired(token) ) { 
      console.log('token exists and is not expired');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }


  logout() {
    // const token = localStorage.getItem('access_token');
    // localStorage.clear();
    localStorage.removeItem('token');
  }

  register(registerUser:any): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/register`, registerUser);

  }


  
}