import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class WordsService {
 
    constructor(
        private http: HttpClient
    ){}

    saveWord(id: string, body: any){
        const token: null|string = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.put(environment.uri + "/word/" + id, body, {headers});
        } else {
            return this.http.put(environment.uri + "/word/" + id, body);
        }
    }

    deleteWord(id: string, wordID: string){
        const token: null|string = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.delete(environment.uri + "/word/" + id + "/" + wordID, {headers});
        } else {
            return this.http.delete(environment.uri + "/word/" + id + "/" + wordID);
        }
    }

    getWord(id: string, wordID: string){
        const token: null|string = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.get(environment.uri + "/word/" + id + "/" + wordID, {headers});
        } else {
            return this.http.get(environment.uri + "/word/" + id + "/" + wordID);
        }
    }

    updateWord(id: string, wordID: string, body: any){
        const token: null|string = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
            return this.http.put(environment.uri + "/word/" + id + "/" + wordID, body, {headers});
        } else {
            return this.http.put(environment.uri + "/word/" + id + "/" + wordID, body);
        }
    }

}