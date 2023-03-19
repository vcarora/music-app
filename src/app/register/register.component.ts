import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';
import { RouteServiceService } from '../services/route-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private form: FormBuilder, private routeService: RouteServiceService, private auth: AuthenticationService,private snackBar:MatSnackBar) { }

  registrationDetails = this.form.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
    confirmPassword: ['', Validators.required],
    phoneNo: ['', [Validators.required, Validators.pattern("^[6-9]\\d{9}$")]]
  })

  get username() { return this.registrationDetails.get('username'); }
  get email() { return this.registrationDetails.get('email'); }
  get password() { return this.registrationDetails.get('password'); }
  get confirmPassword() { return this.registrationDetails.get('confirmPassword'); }
  get phoneNo() { return this.registrationDetails.get('phoneNo'); }

  isSubmitted = false;
  isRegistered = false;

  user: any = {
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    role: 'user',
    trackList: []
  }

  registered() {
    console.log(this.user);
    this.auth.register(this.user).subscribe({
      next: data => {
        data = this.user;
        this.snackBar.open('Login Successful', 'Success', {​
          duration: 3000,​
           panelClass: ['mat-toolbar', 'mat-primary']​
         });
        this.auth.login();
        this.isRegistered = true;
        this.routeService.toHome();
        window.localStorage.setItem("email",this.user.email);
      },
      error: err => {
        alert("This email id("+this.user.email+") is already registered");
      }
    });

  }
  // this.auth.get().subscribe({
  //   next:data => {
  //     const email = data.find((user:any)=>{
  //       return this.registrationDetails.value.email === user.email
  //     });
  //     if(email){
  //       alert('This email id is already registered');
  //     }
  //     else{

  //     // this.isSubmitted = true;
  //     // this.isRegistered = true;
  //   },
  //   error:err => {
  //     alert('SERVER Error occured');
  //     // this.isRegistered = false;
  //   }
  // })
  // }

}
