import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { NoContentComponent } from './no-content/no-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    NoContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthorizationService
  ]
})
export class CoreModule { }
