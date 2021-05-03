import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  registerUser(user)
  {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/user/register', user, {headers: header});
  }
}
