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
    const user = new UserModel({ firstName: 'Alex', lastName: 'P' });
    this.authService.login(user, this.token);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated(this.token);
  }

  getUserInfo() {
    return this.isAuthenticated()
      ? this.authService.getUserInfo(this.token).firstName + ' ' + this.authService.getUserInfo(this.token).lastName
      : '';
  }

  logout() {
    this.authService.logout(this.token);
    console.log('User is logged out.');
  }

}
