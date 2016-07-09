import { Component } from '@angular/core';
import { Page, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../user/user';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from '@angular/common';
 
 
@Page({
    templateUrl: 'build/pages/login/login.html',
    directives: [FORM_DIRECTIVES]
})
 
export class LoginPage {
 
    authForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;
 
    constructor(fb: FormBuilder, private nav: NavController) {
        this.nav = nav;
 
        this.authForm = fb.group({  
            'username': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
 
        this.username = this.authForm.controls['username'];     
        this.password = this.authForm.controls['password'];     
    }
 
    onSubmit(value: User): void { 
        if(this.authForm.valid) {
 
            // This is an easy example, so we're not going to check if authorization was successful
 
            window.localStorage.setItem('username', value.name);
            window.localStorage.setItem('password', value.password);
 
            this.nav.push(HomePage);            
        }
    } 

}
