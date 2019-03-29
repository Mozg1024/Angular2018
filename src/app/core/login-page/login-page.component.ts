import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public userLogin = new FormControl();
  public userPassword = new FormControl();

  constructor(private authService: AuthorizationService) {
    this.userLogin.setValue('president@kremlin.ru');
    this.userPassword.setValue('qwerty123');
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.userLogin.value, this.userPassword.value);
  }

}
