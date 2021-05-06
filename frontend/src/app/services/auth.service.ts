import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: boolean = false;

  constructor(
    private http: HttpClient
  ) {
    this.verifyAuth();
   }

  register(body: any){
    return this.http.post(environment.uri + "/register", body);
  }

  login(body: any){
    return this.http.post(environment.uri + "/login", body);
  }

  verifyAuth(){
    const token: null|string = sessionStorage.getItem("x-access-token");
    if(token) {
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      this.http.get(environment.uri + "/verify-auth", {headers}).subscribe(
        (res: any) => {
          if(res.auth) {
            this.auth = true;
          }
        },
        err => console.log(err)
      )
    } 
  }

}
