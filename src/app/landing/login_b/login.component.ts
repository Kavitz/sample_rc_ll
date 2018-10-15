import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
	selector: 'v1830-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginform: FormGroup;
	hide = true;
	errortext = '';
	constructor(private router: Router, private login: LoginService) { }

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
                sessionStorage.setItem('currentUser', JSON.stringify({ username: this.loginform.get('username').value, token: result.token, userrole: role}));
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

}
