import { NavController, Platform } from 'ionic-angular';
import { Component, OnInit } from "@angular/core";
import { EscolhaPage } from '../escolha/escolha';
import { MelhorCelularPage } from './../melhorcelular/melhorcelular';
import { SobrePistacheiPage } from "../sobrepistachei/sobrepistachei"
import { FormBuilder } from '@angular/forms';
import { HttpClient }    from '@angular/common/http';

@Component({
    selector: 'page-instrucoes',
    templateUrl:'instrucoes.html'
})

export class InstrucoesPage  implements OnInit {
    constructor(public navCtrl: NavController,public formBuilder: FormBuilder, public http: HttpClient) {
    };

    dados = this.formBuilder.group({
      precoMax: [1000],
      camera: [1],
      desempenho: [1],
      tela: [1],
      bateria: [1],
      armazenamento: [1]
    });

    public goMelhorCelularPage(){
      let httpData = new FormData();
      httpData.append('precoMax', this.dados.controls.precoMax.value);
      httpData.append('camera', this.dados.controls.camera.value);
      httpData.append('desempenho', this.dados.controls.desempenho.value);
      httpData.append('tela', this.dados.controls.tela.value);
      httpData.append('bateria', this.dados.controls.bateria.value);
      httpData.append('armazenamento', this.dados.controls.armazenamento.value);
  
      this.http.post('https://mateusbarros.pythonanywhere.com/v2',httpData).subscribe(
          data => {
            if (data['resultado']){
              this.navCtrl.push(MelhorCelularPage, {resultado: data['resultado']}, {animate: true, animation:'pingu', direction: 'forward'});
            }
          },
          err => {
            console.log(err);
          }
        );
      
    };

    public starts : Array<boolean> = [false,false,false,false,false,false,false,false,false,false];


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

    public onGostoClick(escolha){
      this.onComplete();
    }

    public onOdeioClick(escolha){
      this.onComplete();
    }

    public onFacoClick(escolha){
      this.onComplete();
    }
} 