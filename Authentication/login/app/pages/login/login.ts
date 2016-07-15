import { Page, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Page({
    templateUrl: 'build/pages/login/login.html',
})
 
export class LoginPage {
 
    authForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;
    fb: FormBuilder;

    constructor(fb: FormBuilder, private nav: NavController, private http: Http) {
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
            this.authenticatenow(value)
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

    authenticatenow(value) {
        console.log('authenticatenow ' + value.username + ' ' + value.password);
        var headers = new Headers();
        let body = JSON.stringify({ name: value.username, password: value.password });

        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3333/authenticate', body, {headers: headers})
        .map(Response => Response.json())
    } 

}
