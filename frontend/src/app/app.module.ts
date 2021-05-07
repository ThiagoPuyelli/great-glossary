import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/home/welcome/welcome.component';
import { LoginComponent } from './pages/home/login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { HomeAuthComponent } from './pages/pages-auth/home-auth/home-auth.component';
import { GlosariesComponent } from './pages/pages-auth/glosaries/glosaries.component';
import { GlosaryComponent } from './pages/pages-auth/glosary/glosary.component';
import { SaveGlossaryComponent } from './pages/pages-auth/save-glossary/save-glossary.component';
import { SaveWordComponent } from './pages/pages-auth/save-word/save-word.component';
import { UpdateGlossaryComponent } from './pages/pages-auth/update-glossary/update-glossary.component';
import { UpdateWordComponent } from './pages/pages-auth/update-word/update-word.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    HomeAuthComponent,
    GlosariesComponent,
    GlosaryComponent,
    SaveGlossaryComponent,
    SaveWordComponent,
    UpdateGlossaryComponent,
    UpdateWordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
