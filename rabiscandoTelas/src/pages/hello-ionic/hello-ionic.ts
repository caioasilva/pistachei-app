import { EscolhaPage } from './../escolha/escolha';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {
  };

  public goEscolhaPage(){
    this.navCtrl.push(EscolhaPage);
  };
}
