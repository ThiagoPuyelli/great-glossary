import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class GlosariesService {
 
    constructor(
        private http: HttpClient
    ){}

    getGlosaries(){
        const token: string|null = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.get(environment.uri + "/glossary", {headers});
        } else {
            return this.http.get(environment.uri + "/glossary");
        }
    }

    saveGlossary(title: string){
        const token: string|null = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.post(environment.uri + "/glossary", {title}, {headers});
        } else {
            return this.http.post(environment.uri + "/glossary", {title});
        }
    }

    updateGlossary(title: string, id: string){
        const token: string|null = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.put(environment.uri + "/glossary/" + id, {title}, {headers});
        } else {
            return this.http.put(environment.uri + "/glossary/" + id, {title});
        }
    }

    getGlossary(id: string, letter: string){
        const token: string|null = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.get(environment.uri + "/glossary/" + id + "/" + letter, {headers});
        } else {
            return this.http.get(environment.uri + "/glossary/" + id + "/" + letter);
        }
    }

    deleteGlossary(id: string){
        const token: string|null = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.delete(environment.uri + "/glossary/" + id, {headers});
        } else {
            return this.http.delete(environment.uri + "/glossary/" + id);
        }
    }

}