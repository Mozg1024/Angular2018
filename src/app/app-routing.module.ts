import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { LoginPageComponent } from './core/login-page/login-page.component';
import { CoursePageComponent } from './courses/course-page/course-page.component';
import { NoContentComponent } from './core/no-content/no-content.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesPageComponent },
  { path: 'courses/:id', component: CoursePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NoContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
