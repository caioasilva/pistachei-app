import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MelhorCelularPage } from './../melhorcelular/melhorcelular';
import { SobrePistacheiPage } from './../sobrepistachei/sobrepistachei';

@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html'
})
export class EscolhaPage {
  constructor(public navCtrl: NavController) {

  }

  public goMelhorCelularPage(){
    this.navCtrl.push(MelhorCelularPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
  };
  public goSobrePistacheiPage(){
    this.navCtrl.push(SobrePistacheiPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
  };
}
