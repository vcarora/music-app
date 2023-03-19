import { Component } from '@angular/core';
import { RouteServiceService } from '../services/route-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { TokenStorageService } from '../services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private form: FormBuilder, private routeService: RouteServiceService, private auth: AuthenticationService,private snackBar:MatSnackBar) { }

  loginDetails = this.form.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password: ['', Validators.required]
  })

  get email() { return this.loginDetails.get('email'); }
  get password() { return this.loginDetails.get('password'); }

  authDetails:any;

  login(){
    this.auth.loginUser(this.loginDetails.value).subscribe({
      next:data=>{
        this.authDetails = data;
        window.localStorage.setItem("token", this.authDetails.token);
        window.localStorage.setItem("email", this.authDetails.email);
        this.routeService.toHome();
        this.auth.login();
        this.snackBar.open('Login Successful', 'Success', {​
          duration: 3000,​
           panelClass: ['mat-toolbar', 'mat-primary']​
         });
      },
      error:err=>{
        alert("Invalid login details. Try again");
        this.loginDetails.reset();
      }
    })
  }

  // login() {
  //   this.auth.getUser(this.user.email).subscribe({
  //     next: data => {
  //       if(this.user.email === "admin@gmail.com"){
  //         alert("Logged in as admin");
  //       }else{
  //         alert("Login Successful");
  //         this.auth.login();
  //         window.localStorage.setItem("email", this.user.email);
  //         this.routeService.toHome();
  //       }
  //     },
  //     error: err => {
  //       alert("Invalid login details. Try again");
  //       this.loginDetails.reset();
  //     }
      // next: data=>{
      //   for(let i=0;i<data.length;i++){
      //     if((this.loginDetails.value.email === data[i].email) && (this.loginDetails.value.password === data[i].password)){
      //       this.verify.email = data[i].email
      //       this.verify.password = data[i].password
      //     }
      //   }
      //   if(this.verify.email === "" || this.verify.password === ""){
      //     alert("Invalid login details. Try again");
      //     this.loginDetails.reset();
      //   }
      //   else{
      //     alert("Login Successful");
      //     this.auth.login();
      //     window.localStorage.setItem("email",this.user.email);
      //     this.routeService.toHome();
      //   }
      // },
      // error: err => {
      //   alert("Server error");
      //   this.loginFailed = true;
      // }
  //   })

  // }

}
