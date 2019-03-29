import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { AuthorizationGuard } from './guards/authorization/authorization.guard';
import { AuthorizationService } from './services/authorization/authorization.service';
import { CoursesService } from './services/courses/courses.service';
import { AuthorizationInterceptor } from './services/authorization/authorization.interceptor';
import { authReducer } from './store/reducers/auth.reducer';
import { coursesReducer } from './store/reducers/courses.reducer';
import { CoursesEffects } from './store/effects/courses.effects';
import { NgbDateCustomParserFormatter } from './formatters/date-custom-parser-formatter';

// Application wide providers
const APP_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  },
  {
    provide: NgbDateParserFormatter,
    useClass: NgbDateCustomParserFormatter
  },
  AuthorizationService,
  AuthorizationGuard,
  CoursesService
];

const APP_REDUCERS = {
  auth: authReducer,
  courses: coursesReducer
};

const APP_EFFECTS = [
  CoursesEffects
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(APP_REDUCERS),
    EffectsModule.forRoot(APP_EFFECTS),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    CoursesModule
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
