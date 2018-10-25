import { NavController, Platform } from 'ionic-angular';
import { Component, OnInit } from "@angular/core";
import { EscolhaPage } from '../escolha/escolha';

@Component({
    selector: 'page-instrucoes',
    templateUrl:'instrucoes.html'
})

export class InstrucoesPage  implements OnInit {
    constructor(public navCtrl: NavController, platform: Platform){
      platform.registerBackButtonAction(() => {
        this.navCtrl.pop({animate: true, animation:'slide', direction: 'back'});
      });
    };

    public starts : Array<boolean> = [false,false,false,false,false,false];


    start: boolean = false;


    ngOnInit () {
      setTimeout(() => this.starts[0] = true, 1000);
      setTimeout(() => this.starts[1] = true, 7200);
      setTimeout(() => this.starts[2] = true, 10000);
      setTimeout(() => this.starts[3] = true, 15600);
      setTimeout(() => this.starts[4] = true, 19800);
      setTimeout(() => this.starts[5] = true, 27100);
    }

    public goEscolhaPage(){
        this.navCtrl.push(EscolhaPage, {}, {animate: true, animation:'slide', direction: 'forward'});
      };
} 