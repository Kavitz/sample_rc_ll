import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { APIService } from './apiservice.service';
@Injectable()
export class UtilService {
    token: string;
    constructor(private router: Router ) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    authenticationFailed(err) {
        console.log('authenticationFailed --- ', err);
        if (err == '404' || err == '401' || err == '500') {
            alert('Authentication Failed');
            this.router.navigate(['/login']);
        } else if (err == '400') {
            alert('Bad Request. The server received an invalid response from the server.');
        } else if (err == '408') {
            alert('Request Timeout');
        } else if (err == '204') {
            alert('Empty Response');
        } else if (err == '503') {
            alert('Service Unavailable.');
        } else if (err == '599') {
            alert('Network connect timeout error.');
        } else if (err == '502') {
            alert('Bad Gateway.');
        } else if (err == '504') {
            alert('Gateway Timeout.');
        } else if (err == '507') {
            alert('The Server is unable to store the representation needed to complete the request.');
        } else if (err == '414' || err == '413') {
            alert('Request-url Too Long.');
        } else if (err == '415') {
            alert('Unsupported Media Type.');
        } else if (err == '403') {
            alert('Access is forbidden to the requested page.');
        } else if (err == '0') {
            alert('Server Down');
            this.router.navigate(['/login']);
        } else {
            return;
        }
    }

    buildHeaders(): RequestOptions {
        const headers = new Headers();
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        headers.append('x-access-token', this.token);
        const options = new RequestOptions({ headers: headers });
        return options;
    }

    log(message1: any): void {
        console.log(message1);
    }

    log2(message1: string, message2: any): void {
        console.log(message1, message2);
    }

    // retrivedata(url, from) {
    //     this.service.getAPI(url).subscribe((resElementData) => {
    //         console.log(resElementData);
    //         return resElementData;
    //     }, (err) => {
    //         this.log2('server failure in retriving ' + from + ' (err.status)', err.status);
    //     });
    // }

}
