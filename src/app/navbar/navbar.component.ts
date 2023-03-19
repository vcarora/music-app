import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { RouteServiceService } from '../services/route-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  selectedMenu: string = '';

  constructor(private auth: AuthenticationService,private route:RouteServiceService) { }

  loginStatus$?: Observable<boolean>;

  ngOnInit(): void {
    this.loginStatus$ = this.auth.isLoggedIn;
  }

  logout() {
    window.localStorage.setItem("token","");
    window.localStorage.setItem("email","");
    this.auth.logout();
    this.route.toHome();
  }

  value:any = window.localStorage.getItem("email");

}
