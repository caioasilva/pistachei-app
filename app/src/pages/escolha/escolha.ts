import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MelhorCelularPage } from './../melhorcelular/melhorcelular';
import { SobrePistacheiPage } from './../sobrepistachei/sobrepistachei';
import { FormBuilder } from '@angular/forms';
import { HttpClient }    from '@angular/common/http';

@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html'
})
export class EscolhaPage {

  dados = this.formBuilder.group({
    precoMax: [1000],
    camera: [1],
    desempenho: [1],
    tela: [1],
    bateria: [1],
    armazenamento: [1]
  });

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder, public http: HttpClient) {
  }

  public goMelhorCelularPage(){
    let httpData = new FormData();
    httpData.append('precoMax', this.dados.controls.precoMax.value);
    httpData.append('camera', this.dados.controls.camera.value);
    httpData.append('desempenho', this.dados.controls.desempenho.value);
    httpData.append('tela', this.dados.controls.tela.value);
    httpData.append('bateria', this.dados.controls.bateria.value);
    httpData.append('armazenamento', this.dados.controls.armazenamento.value);

    this.http.post('http://127.0.0.1:5000/v2',httpData).subscribe(
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
  public goSobrePistacheiPage(){
    this.navCtrl.push(SobrePistacheiPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
  };

}


