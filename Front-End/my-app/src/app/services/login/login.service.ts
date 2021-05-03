import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken:any;
  user: String;

  constructor(private http:HttpClient) { }

  login(user)
  {
    let header = new HttpHeaders;
    header = header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/user/login', user, {headers: header});
  }

  getProfile()
  {
    this.getToket();
    let header = new HttpHeaders;
    header = header.append('authorization', this.authToken);
    header = header.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8000/user/profile', {headers: header});
  }

  getToket()
  {
    var token = (document.cookie).split('id_token=');
    this.authToken = token[1];
  }

  setToken(user, token, rememberME)
  {
    var expire = "";
    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    if(rememberME)
    {
      expire = "expires = " + date.toUTCString()
    }

    console.log(rememberME, date);

    var cookie = "id_token = " + token + "; " + expire + "; path=/";
    document.cookie = cookie;

    // localStorage.setItem('id_token', token);
    // localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  logOut()
  {
    this.authToken = null;
    this.user = null;
    // localStorage.clear();

    var expire = "";
    var date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    expire = "expires = " + date.toUTCString()

    var cookie = "id_token = " + this.authToken + "; " + expire + "; path=/";
    document.cookie = cookie;
  }

  loggedIn()
  {
    var token = (document.cookie).split('id_token=');
    if(token[1])
    {
      return true;
    }
  }
}
