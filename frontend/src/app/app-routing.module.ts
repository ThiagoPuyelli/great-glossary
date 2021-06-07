import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/home/login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { WelcomeComponent } from './pages/home/welcome/welcome.component';

import { AuthGuard } from "./auth/auth.guard"
import { NoAuthGuard } from "./auth/no-auth.guard"
import { HomeAuthComponent } from './pages/pages-auth/home-auth/home-auth.component';
import { GlosariesComponent } from './pages/pages-auth/glosaries/glosaries.component';
import { GlosaryComponent } from './pages/pages-auth/glosary/glosary.component';
import { SaveGlossaryComponent } from './pages/pages-auth/save-glossary/save-glossary.component';
import { SaveWordComponent } from './pages/pages-auth/save-word/save-word.component';
import { UpdateGlossaryComponent } from './pages/pages-auth/update-glossary/update-glossary.component';
import { UpdateWordComponent } from './pages/pages-auth/update-word/update-word.component';
import { RecoverPasswordComponent } from './pages/home/recover-password/recover-password.component';
import { ChangePasswordComponent } from './pages/home/change-password/change-password.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canLoad: [NoAuthGuard], canActivate: [NoAuthGuard],
  children: [
    { path: "", component: WelcomeComponent, canLoad: [NoAuthGuard], canActivate: [NoAuthGuard] },
    { path: "register", component: RegisterComponent, canLoad: [NoAuthGuard], canActivate: [NoAuthGuard] },
    { path: "login", component: LoginComponent, canLoad: [NoAuthGuard], canActivate: [NoAuthGuard] },
    { path: "recover-password", component: RecoverPasswordComponent, canLoad: [NoAuthGuard], canActivate: [NoAuthGuard] },
    { path: "change-password/:code", component: ChangePasswordComponent, canLoad: [NoAuthGuard], canActivate: [NoAuthGuard] }
  ],
 },
 { path: "auth", component: HomeAuthComponent, canLoad: [AuthGuard], canActivate: [AuthGuard],
  children: [
    { path: "", component: GlosariesComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
    { path: "save-glossary", component: SaveGlossaryComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
    { path: "glossary/:id/:letter", component: GlosaryComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
    { path: "save-word/:id", component: SaveWordComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
    { path: "update-glossary/:id/:title", component: UpdateGlossaryComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
    { path: "update-word/:id/:wordID", component: UpdateWordComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
