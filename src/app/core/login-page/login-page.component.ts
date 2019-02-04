import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private token = 'user_token';
  public userEmail = 'president@kremlin.ru';
  public userPassword = '';

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  login() {
    const user = new UserModel({ firstName: 'Alex', lastName: 'P' });
    this.authService.login(user, this.token);
    console.log(`${this.userEmail} logged in successfully.`);
  }

}
