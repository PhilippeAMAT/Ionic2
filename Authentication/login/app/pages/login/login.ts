import { Page, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Authentication } from '../../providers/authentication/authentication';

@Page({
    templateUrl: 'build/pages/login/login.html',
    providers: [Authentication]
})
 
export class LoginPage {
 
    authForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;
    fb: FormBuilder;

    constructor(fb: FormBuilder, private nav: NavController, private authentication: Authentication) {
            this.fb = fb;
    }
 
    ngOnInit() {
        this.authForm = this.fb.group({  
            'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
        });
 
        this.username = this.authForm.controls['username'];     
        this.password = this.authForm.controls['password'];
    }

    onSubmit(value): void { 

        if(this.authForm.valid) {
            this.authentication.authenticatenow(value)
            .subscribe((data) => {
                if(data.success) {
                    window.localStorage.setItem('auth_key', data.token);
                    console.log('true');}
                    this.nav.push(HomePage);
                    window.localStorage.setItem('username', value.username);
                    window.localStorage.setItem('password', value.password); 
                    console.log('Valid user');
                    console.log('token : ' + window.localStorage.getItem('auth_key'));
                    console.log('username : ' + window.localStorage.getItem('username'));
                    console.log('password : ' + window.localStorage.getItem('password'));
                },
                error => {
                    console.log('Invalid user/password');}
                )
        }
    }
}
