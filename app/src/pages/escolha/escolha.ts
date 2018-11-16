import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MelhorCelularPage } from './../melhorcelular/melhorcelular';
import { SobrePistacheiPage } from './../sobrepistachei/sobrepistachei';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html'
})
export class EscolhaPage {

  dados = this.formBuilder.group({
    precoMax: [800],
    camera: [],
    desempenho: [],
    tela: [],
    bateria: [],
    armazenamento: []
  });

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder) {

  }

  public goMelhorCelularPage(){
    let data = {
      "precoMax": this.dados.controls.precoMax,
      "camera": this.dados.controls.camera,
      "desempenho": this.dados.controls.desempenho,
      "tela": this.dados.controls.tela,
      "bateria": this.dados.controls.bateria,
      "armazenamento": this.dados.controls.armazenamento,
    }

    this.navCtrl.push(MelhorCelularPage, {dados: this.dados}, {animate: true, animation:'pingu', direction: 'forward'});
  };
  public goSobrePistacheiPage(){
    this.navCtrl.push(SobrePistacheiPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
  };
}
