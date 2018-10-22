import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InstrucoesPage } from '../intrucoes/instrucoes';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {
  };

  public goInstrucoesPage(){
    this.navCtrl.push(InstrucoesPage, {}, {animate: true, animation:'modal-scale-up-enter', direction: 'forward'});
  };
}
