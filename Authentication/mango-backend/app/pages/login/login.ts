import { Page, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../user/user';
import { FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
import {Http, Headers} from '@angular/http';

@Page({
    templateUrl: 'build/pages/login/login.html',
})
 
export class LoginPage {
 
    authForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;
    fb: FormBuilder;
    isAuthenticated: boolean = false;

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
            
            
            
            let checknow = this.authenticatenow(value);
            checknow.then((res) => {
            if(res) {
                this.nav.push(HomePage);
                window.localStorage.setItem('username', value.name);
                window.localStorage.setItem('password', value.password); 
                console.log('Valid user');
            }
            else {
                console.log('Invalid user');
            }
            })    
        }
        else {
                console.log('Invalid authForm');
            }
    }
    authenticatenow(value) {

        var headers = new Headers();
        let body = JSON.stringify({ name: value.username, password: value.password });

        headers.append('Content-Type', 'application/json');
        return new Promise((resolve) => {
        this.http.post('http://localhost:3333/authenticate', body, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                window.localStorage.setItem('auth_key', data.json().token);
                this.isAuthenticated = true;}
                resolve(this.isAuthenticated);
            }
        )
        
        })
    } 

}
