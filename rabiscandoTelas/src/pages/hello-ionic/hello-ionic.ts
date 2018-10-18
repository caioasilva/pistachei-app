import { EscolhaPage } from './../escolha/escolha';
import { SobreNosPage } from './../sobrenos/sobrenos';
import { SobrePistacheiPage } from './../sobrepistachei/sobrepistachei';
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

  public goSobreNosPage(){
    this.navCtrl.push(SobreNosPage);
  };

  public goSobrePistacheiPage(){
    this.navCtrl.push(SobrePistacheiPage);
  };

}
