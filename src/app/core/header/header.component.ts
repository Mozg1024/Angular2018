import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated$: Observable<boolean>;
  public userInfo$: Observable<UserModel>;

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.userInfo$ = this.authService.userInfo();
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login']);
    console.log('Redirect to login page.');
  }

  logout() {
    this.authService.logout();
  }

}
