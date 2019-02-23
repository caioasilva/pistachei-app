import { Component, OnInit } from '@angular/core';
import { NavController, Platform, App } from 'ionic-angular';
import { InstrucoesPage } from '../intrucoes/instrucoes';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit  {
  constructor(public navCtrl: NavController, platform: Platform, app: App) {
    platform.registerBackButtonAction(() => {
 
      let nav = app.getActiveNavs()[0];             

      if (nav.canGoBack()){ //Can we go back?
        navCtrl.pop({animate: true, animation:'pingu', direction: 'back'}); // Change the default transition on GoBack
      } else {
        platform.exitApp(); // Close this application
      }
    });
  };

  start: boolean = false
    
  ngOnInit () {
    setTimeout(() => this.start = true, 1000)
  }
  
  public goInstrucoesPage(){
    this.navCtrl.push(InstrucoesPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
  };
}
