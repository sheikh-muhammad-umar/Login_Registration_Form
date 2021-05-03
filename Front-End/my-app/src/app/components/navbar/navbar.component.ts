import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  logOut()
  {
    this.loginService.logOut();
    console.log("Loged out.");

    this.router.navigate(['/login']);
  }

  checkLogin()
  {
    return this.loginService.loggedIn();
  }

}
