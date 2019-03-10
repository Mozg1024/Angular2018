import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public userLogin = 'president@kremlin.ru';
  public userPassword = 'qwerty123';

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.userLogin, this.userPassword);
  }

}
