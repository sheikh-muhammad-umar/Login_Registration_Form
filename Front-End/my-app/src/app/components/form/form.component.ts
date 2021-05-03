import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form:FormGroup;
  submitted: boolean = false;
  namesNotAllowed=['omer123', 'omer098'];
  emailsNotAllowed=['omer123@gmail.com', 'omer098@gmail.com'];

  constructor(private formBuilder:FormBuilder, private registerService:RegisterService, private router:Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      info: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,20}$')]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$')], this.checkEmail.bind(this)),
        phone: new FormControl('', [Validators.required, Validators.pattern('^(03|\\+923)[0-4][0-9]{8}$')]),
        userName: new FormControl('', [Validators.required]),
      }),
      password: new FormControl('', [Validators.required, , Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$')]),
      course: new FormControl('Diploma', Validators.required),
      skills: new FormArray([
        new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{2,20}$')]),
      ]),
      gender:new FormControl('', Validators.required),
      checkbox: new FormControl(false, Validators.requiredTrue)
    });
  }
  // checkUserName(control:FormControl)
  // {
  //   if(this.namesNotAllowed.indexOf(control.value) !== -1)
  //   {
  //     return{notAvailable:true};
  //   }
  //   return null;
  // }

  checkEmail(control:FormControl): Promise<any>
  {
    const response = new Promise<any>((res, rej) => {
      setTimeout(() => {
        if(this.emailsNotAllowed.indexOf(control.value) !== -1)
        {
          res({notAvailable:true});
        }
        else{
          res(null);
        }
      }, 1500);
    });
    return response;
  }

  onAddSkill()
  {
    const newSkill = new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{2,20}$')]);
    (<FormArray>this.form.get('skills')).push(newSkill);
  }

  onDeleteSkill(i)
  {
    (<FormArray>this.form.get('skills')).removeAt(i);
  }

  onSubmit()
  {
    if(this.form.status == "VALID")
    {
      let newUser = this.form.value;
      console.log(newUser);
      this.registerService.registerUser(newUser)
      .subscribe(next => {
        console.log("Registered.");
      }, error => {
        console.log(error);
      }, () => {
        console.log("Complete.");
      })  
      
      console.log("Form Submitted.");
      this.form.reset({
        course: 'Diploma',
        skills: [''],
      });
      this.router.navigate(['/login']);
    }
    else{
      console.log(this.form);
      this.submitted = false;
      console.log("Form Not Submitted.. !");
    }
  }
}
