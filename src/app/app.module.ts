import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { AuthorizationGuard } from './guards/authorization/authorization.guard';
import { AuthorizationService } from './services/authorization/authorization.service';
import { CoursesService } from './services/courses/courses.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptor } from './services/authorization/authorization.interceptor';
import { authReducer } from './store/reducers/auth.reducer';

// Application wide providers
const APP_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  },
  AuthorizationService,
  AuthorizationGuard,
  CoursesService
];

const APP_REDUCERS = {
  auth: authReducer
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(APP_REDUCERS),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    CoursesModule
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
