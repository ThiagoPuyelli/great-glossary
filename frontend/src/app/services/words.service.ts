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
            const headers: HttpHeaders = new HttpHeaders().set("Authorization", 'Bearer ' + token);
            return this.http.put("/word/" + id, body, {headers});
        } else {
            return this.http.put("/word/" + id, body);
        }
    }

    deleteWord(id: string, wordID: string){
        const token: null|string = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("Authorization", 'Bearer ' + token);
            return this.http.delete("/word/" + id + "/" + wordID, {headers});
        } else {
            return this.http.delete("/word/" + id + "/" + wordID);
        }
    }

    getWord(id: string, wordID: string){
        const token: null|string = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("Authorization", 'Bearer ' + token);
            return this.http.get("/word/" + id + "/" + wordID, {headers});
        } else {
            return this.http.get("/word/" + id + "/" + wordID);
        }
    }

    updateWord(id: string, wordID: string, body: any){
        const token: null|string = sessionStorage.getItem("x-access-token");
        if(token){
            const headers: HttpHeaders = new HttpHeaders().set("Authorization", 'Bearer ' + token);
            return this.http.put("/word/" + id + "/" + wordID, body, {headers});
        } else {
            return this.http.put("/word/" + id + "/" + wordID, body);
        }
    }

}