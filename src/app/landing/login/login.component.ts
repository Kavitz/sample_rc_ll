import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { Observable } from 'rxjs';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import 'rxjs/add/observable/timer';
import { DISABLED } from '@angular/forms/src/model';
@Component({
	selector: 'v1830-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	loginform: FormGroup;
	hide = true;
	errortext = '';
	constructor(private router: Router, private login: LoginService, private bottomSheet: MatBottomSheet) { }

	ngOnInit(): void {
		this.createForm();
	}

	private createForm() {
		this.loginform = new FormGroup({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}

	get username() {
		return this.loginform.get('username');
	}

	get password() {
		return this.loginform.get('password');
	}

	doLogin() {
		console.log('login clicked');
		this.login.login(this.loginform.value).subscribe((result) => {
			this.errortext = '';
			this.login.getUserRole(this.loginform.value).subscribe((role) => {
				console.log('role ----- ', role);
				sessionStorage.setItem('currentUser', JSON.stringify({ username: this.loginform.get('username').value, token: result.token, userrole: role }));
				console.log('result ---', result);
				console.log('result ---', result.token);
				if (role == 'observer') {
					this.router.navigate(['/default']);
				} else {
					this.router.navigate(['/home']);
				}
			});
		},
			(err) => {
				console.log(err.status);
				this.loginform.reset();
				if (err.status == '404') {
					this.errortext = 'Invalid Username.';
				} else if (err.status == '401') {
					this.errortext = 'Invalid password.';
				} else {
					this.errortext = 'Server down, please contact administrator.';
				}
			});
	}
	openBottomSheet(): void {
		console.log('openBottomSheet clicked');
		this.bottomSheet.open(BottomSheetOverviewExampleSheet, { disableClose: true });
	}

}
@Component({
	selector: 'v1830-bottom-sheet-overview-example-sheet',
	templateUrl: 'bottom-sheet-register.html',
})
// tslint:disable-next-line:component-class-suffix
export class BottomSheetOverviewExampleSheet implements OnInit {
	private rForm: FormGroup;
	private registerStatus: boolean = false;
	private statusmessage: string = '';
	private registerDetails: any = { username: '', pass: '', group: '' };
	private grouplist$: Observable<string[]>;
	constructor(private router: Router, private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>, private fb: FormBuilder, private service: APIService) {
		this.grouplist$ = this.service.getAPI(APIConstants.RETRIEVE_GROUP_NAME_LIST);
		this.constructForm();
	}
	ngOnInit() {

	}
	constructForm() {
		this.rForm = this.fb.group({
			username: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+$')]],
			password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(.{8,15})$')]],
			confirmpassword: [null, Validators.required],
			usergroup: ['None']
		}, { validator: this.checkIfMatchingPasswords('password', 'confirmpassword') });
	}
	get username() {
		return this.rForm.get('username');
	}
	get password() {
		return this.rForm.get('password');
	}
	get confirmpassword() {
		return this.rForm.get('confirmpassword');
	}
	get usergroup() {
		return this.rForm.get('usergroup');
	}
	openLink(event: MouseEvent): void {
		this.bottomSheetRef.dismiss();
		event.preventDefault();
	}
	closeFormGroupDirective() {
		console.log('close clicked');
		this.bottomSheetRef.dismiss();
	}

	checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
		return (group: FormGroup) => {
			const passwordInput = group.controls[passwordKey],
				passwordConfirmationInput = group.controls[passwordConfirmationKey];
			if (passwordInput.value !== passwordConfirmationInput.value) {
				return passwordConfirmationInput.setErrors({ notEquivalent: true });
			} else {
				return passwordConfirmationInput.setErrors(null);
			}
		};
	}
	registerFormGroupDirective() {
		console.log(this.rForm.value);
		console.log('registerFormGroupDirective');
		if (this.rForm.invalid) {
			this.statusmessage = 'Please fill out all the fields!';
		} else {
		this.registerDetails = { username: this.rForm.value.username, password: this.rForm.value.password, groupname: this.rForm.value.usergroup, role: 'observer' };
		this.service.postAPI(APIConstants.ADDREGISTERDETAILS, this.registerDetails)
			.subscribe((registerresult) => {
				this.rForm.reset();
				this.registerStatus = true;
				if (registerresult == 'failed') {
					this.statusmessage = 'Registration Failed, Please try again!';
				} else if (registerresult == 'userexist') {
					this.statusmessage = 'Username already exist, Please try again!';
				} else {
					this.statusmessage = 'Registration success, please contact administrator for access!';
					// setTimeout(() => { this.bottomSheetRef.dismiss(); }, 2000);
				}
			});
		}
	}
	//  shouldBeUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    //     return Observable
    //         .timer(50)
    //         .debounceTime(50)
    //         .distinctUntilChanged()
    //         .switchMap(() => {
    //             return this.service.getAPI(APIConstants.RETRIEVE_GROUPLIST,control.value);
    //         })
    //         .map((res) => res.json())
    //         .map((res) => res ? { shouldBeUnique: true } : null);
    // }
}
