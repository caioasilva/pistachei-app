import { Component, OnInit } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InstrucoesPage } from '../intrucoes/instrucoes';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit  {
  constructor(public navCtrl: NavController) {
  };

  start: boolean = false
    
  ngOnInit () {
    setTimeout(() => this.start = true, 1000)
  }
  
  public goInstrucoesPage(){
    this.navCtrl.push(InstrucoesPage, {}, {animate: true, animation:'modal-scale-up-enter', direction: 'forward'});
  };
}
