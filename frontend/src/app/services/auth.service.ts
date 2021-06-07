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
    return this.http.post(environment.uri + "/auth/sign-up", body);
  }

  login(body: any){
    const encode = window.btoa(body.email + ':' + body.password)
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic ' + encode)
    return this.http.post(environment.uri + "/auth/sign-in", body, {headers});
  }

  verifyAuth(){
    const token: null|string = sessionStorage.getItem("x-access-token");
    if(token) {
      const headers: HttpHeaders = new HttpHeaders().set("Authorization", 'Bearer ' + token);
      this.http.get("/verify-auth", {headers}).subscribe(
        (res: any) => {
          if(res.auth) {
            this.auth = true;
          }
        },
        err => console.log(err)
      )
    } 
  }

  recoverPassword(email: string){
    return this.http.put(environment.uri + '/auth/recover-password', { email })
  }

  changePassword(body: any) {
    return this.http.put(environment.uri + '/auth/change-password', body)
  }

}
