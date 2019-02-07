import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private token = 'user_token';

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated(this.token);
  }

  getUserInfo() {
    const userInfo = this.authService.getUserInfo(this.token);

    return (userInfo instanceof UserModel)
      ? userInfo.firstName + ' ' + userInfo.lastName
      : '';
  }

  logout() {
    this.authService.logout(this.token);
    console.log('User is logged out.');
  }

}
