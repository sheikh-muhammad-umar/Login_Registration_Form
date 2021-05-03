import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getProfile()
    .subscribe((data: any) => {
      // console.log(data);
      this.user = data;
    }, error => {
      console.log(error);
      this.router.navigate(['/login']);
      return false;
    }, () => {
      console.log("Complete.");
    })  
  }
}
