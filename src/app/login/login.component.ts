import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hasnumber: boolean = false
  hasuppercase: boolean = false
  haslowercase: boolean = false
  hasspecialcase: boolean = false
  hasEightdigit: boolean = false

  constructor(private toastr: ToastrService, private router: Router, private fb: FormBuilder, private services: ServicesService) { }

  registrationForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, this.passwordValidator()]],

  })

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required]]
  })
  activeTab: string = 'login';



  signupwithfacebook() {
    this.services.isenabledashboard = true;
    window.location.href = 'http://localhost:3000/oauth/auth/facebook';
  }
  signupwithgoogle() {
    this.services.isenabledashboard = true;
    window.location.href = 'http://localhost:3000/oauth/auth/google';
  }
  signupwithgithub() {
    this.services.isenabledashboard = true;
    window.location.href = 'http://localhost:3000/api/oauth/github';
  }
  login() {
    this.services.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {
      console.log(response);
      if (response.data.token) {
        sessionStorage.setItem('token',response.data.token);
        this.services.isenabledashboard = true;
        this.router.navigateByUrl('/dashboard');
      } else {
        this.toastr.error(
          `${response.data}`,
          'Error'
        );
        return;
      }
    });
  }
  
  register() {
  
    this.services.register(this.registrationForm.value.name, this.registrationForm.value.email, this.registrationForm.value.password).subscribe((response) => {
      console.log(response)
      if ( response.data.token) {
        sessionStorage.setItem('token',response.data.token);
    this.services.isenabledashboard = true;
    this.router.navigateByUrl('/dashboard');
  } else {
    this.toastr.error(
      `${response.data}`,
      'Error'
    );
    return;
  }
    },)

  }



  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;


      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

      this.hasEightdigit = password.length > 8 ? true : false;

      this.hasnumber = /[0-9]/.test(password);
      console.log(this.hasnumber)
      this.hasuppercase = /[A-Z]/.test(password);
      this.haslowercase = /[a-z]/.test(password);
      this.hasspecialcase = /[!@#$%^&*]/.test(password);

      return passwordRegex.test(password) ? null : { invalidPassword: true };
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password')?.value;
      const repeatPassword = control.get('repeatPassword')?.value;

      if (password !== undefined && repeatPassword !== undefined && password !== repeatPassword) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }



}




