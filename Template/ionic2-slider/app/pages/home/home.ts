import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  mySlideOptions = {
    initialSlide: 0,
    loop: true,
    pager: true
  };

  @ViewChild('mySlider') slider: Slides;




  GoToPage(pageNumber)
  {
    if(pageNumber < 1) return;
    this.slider.slideTo(pageNumber);
    console.log(pageNumber);
  }
}
