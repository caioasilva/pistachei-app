import { NavController } from 'ionic-angular';
import { Component } from "@angular/core";
import { EscolhaPage } from '../escolha/escolha';

@Component({
    selector: 'page-instrucoes',
    templateUrl:'instrucoes.html'
})

export class InstrucoesPage{
    constructor(public navCtrl: NavController){};

    public goEscolhaPage(){
        this.navCtrl.push(EscolhaPage, {}, {animate: true, animation:'modal-scale-up-enter', direction: 'forward'});
      };
}