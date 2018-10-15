import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { LoginService } from '../../landing/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'v1830-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  navbarOpen = false;
  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  doLogout() {
    this.loginservice.logout();
		this.router.navigate(['/login']);
  }
}
