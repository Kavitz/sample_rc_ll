import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { UtilService } from './utils.service';

@Injectable()
export class APIService {
  static _serverurl = 'http://149.204.148.220:3030/';

	constructor(private http: Http, private utilservice: UtilService) {
		console.log('');
	}

	getAPI(url: string) {
		return this.http.get(APIService._serverurl + url +
		Math.floor(Math.random() * 1000001),  this.utilservice.buildHeaders()
		).pipe(map(res => res.json()));
	}

	addAPI(url: string, newValue: any) {
		return this.http.post(APIService._serverurl + url, newValue,  this.utilservice.buildHeaders())
		.pipe(map(res => res.json()));
	}


	postAPI(url: string, newValue: any) {
		return this.http.post(APIService._serverurl + url, newValue,  this.utilservice.buildHeaders())
		.pipe(map(res => res.json()));
	}

	deletelogAPI(url: string, newValue: any) {
		return this.http.post(APIService._serverurl + url, newValue,  this.utilservice.buildHeaders())
		.pipe(map(res => res.json()));
	}

	deleteAPI(url: string, newValue: any) {
		console.log('delete service is called', newValue);
		return this.http.delete(APIService._serverurl + url + newValue,  this.utilservice.buildHeaders())
		.pipe(map(res => res.json()));
	}

	editAPI(url: string, name: string, updatedValue: any) {
		return this.http.put(APIService._serverurl + url + name,
			updatedValue,  this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	checkExistingAPI(url: string, checkname: any) {
		return this.http.get(url + checkname,  this.utilservice.buildHeaders());
	}

	selectAPI(url: string, newValue: any) {
		console.log('inside addAPI');
		return this.http.get(APIService._serverurl + url + newValue +  '/' +
			Math.floor(Math.random() * 1000001 ),  this.utilservice.buildHeaders() )
			.pipe(map(res => res.json()));
	}
	selectLogAPI(url: string, newValue: any) {
		console.log('inside addAPI');
		return this.http.get(APIService._serverurl + url + Math.floor(Math.random() * 1000001 ) +  '/' +
		newValue,  this.utilservice.buildHeaders() )
			.pipe(map(res => res.json()));
	}
}
