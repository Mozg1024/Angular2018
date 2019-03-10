import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserInfo() {
    const userInfo = this.authService.getUserInfo();

    return (userInfo instanceof UserModel)
      ? userInfo.firstName + ' ' + userInfo.lastName
      : '';
  }

  login() {
    this.router.navigate(['/login']);
    console.log('Redirect to login page.');
  }

  logout() {
    this.authService.logout();
  }

}
