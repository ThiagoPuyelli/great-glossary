import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/home/login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { WelcomeComponent } from './pages/home/welcome/welcome.component';

const routes: Routes = [
  { path: "", component: HomeComponent,
  children: [
    { path: "", component: WelcomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
