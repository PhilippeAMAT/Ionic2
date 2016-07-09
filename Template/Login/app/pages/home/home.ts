import {Component} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';

import { LoginPage } from '../login/login';
 
 
@Page({
    templateUrl: 'build/pages/home/home.html'
})
 
export class HomePage {
 
  private name: string;

    constructor(private nav: NavController, navParams: NavParams) {
      this.nav = nav;
      this.name = window.localStorage.getItem('username');   
    }
 
    logout(): void { 
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
 
        this.nav.setRoot(LoginPage);
      this.nav.popToRoot();   
    } 
}
