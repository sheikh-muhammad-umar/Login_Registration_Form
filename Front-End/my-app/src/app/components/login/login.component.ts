import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators, FormArray} from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$')]),
      password: new FormControl('', [Validators.required,]),
      checkbox: new FormControl(''),
      })
  }

  onSubmit(){
    if(this.form.valid)
    {
      const User = this.form.value;

      this.loginService.login(User)
      .subscribe((data: any) => {
        console.log(User.checkbox);
        this.loginService.setToken(data.user, data.token, User.checkbox);
        console.log('Logged in', User);
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error);
      }, () => {
        console.log("Complete.");
      })  

      this.form.reset();
    }
    else{
        console.log("Not Valid.");
    }
  }

}
