import { NavController, Platform } from 'ionic-angular';
import { Component, OnInit } from "@angular/core";
import { EscolhaPage } from '../escolha/escolha';
import { SobrePistacheiPage } from "../sobrepistachei/sobrepistachei"

@Component({
    selector: 'page-instrucoes',
    templateUrl:'instrucoes.html'
})

export class InstrucoesPage  implements OnInit {
    constructor(public navCtrl: NavController){
    };

    public starts : Array<boolean> = [false,false,false,false,false,false];


    start: boolean = false;


    ngOnInit () {
      setTimeout(() => this.starts[0] = true, 100);
    }
    
    public chat = 0;

    public goEscolhaPage(){
      this.navCtrl.push(EscolhaPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
    };
    public goSobrePistacheiPage(){
      this.navCtrl.push(SobrePistacheiPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
    };
    
    public onComplete(){
      this.chat += 1;
      this.starts[this.chat] = true;
    }
} 