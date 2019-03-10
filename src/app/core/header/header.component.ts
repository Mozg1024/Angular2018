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

  public userFirstName;
  public userLastName;

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.userInfo().subscribe(userModel => {
      this.userFirstName = (userModel && userModel.firstName) || '';
      this.userLastName = (userModel && userModel.lastName) || '';
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  login() {
    this.router.navigate(['/login']);
    console.log('Redirect to login page.');
  }

  logout() {
    this.authService.logout();
  }

}
