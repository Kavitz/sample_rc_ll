import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    static _serverurl = 'http://149.204.148.220:3030/';
    token: string;
    constructor(private http: Http, private router: Router) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(userdetails: any) {
    	return this.http.post(LoginService._serverurl + 'api/login', userdetails)
        .map((res) => {
            const response = res.json();
            this.token = response.token;
            return res.json();
        });
    }

    getUserRole(userdetails: any) {
        return this.http.post(LoginService._serverurl + 'api/getUserRole/' + Math.floor(Math.random() * 1000001), userdetails)
        .map((res) => {
            return res.json();
        });
    }

    logout(): void {
        this.token = null;
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
    }
}
