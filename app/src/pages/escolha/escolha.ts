import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MelhorCelularPage } from './../melhorcelular/melhorcelular';
import { SobrePistacheiPage } from './../sobrepistachei/sobrepistachei';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClient }    from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { HtmlAstPath } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';

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

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder, public http: HttpClient) {

  }

  public goMelhorCelularPage(){
    let dados = new URLSearchParams();
    dados.append('precoMax', String(this.dados.controls.precoMax));
    dados.append('camera', String(this.dados.controls.camera));
    dados.append('desempenho', String(this.dados.controls.desempenho));
    dados.append('tela', String(this.dados.controls.tela));
    dados.append('bateria', String(this.dados.controls.bateria));
    dados.append('armazenamento', String(this.dados.controls.armazenamento));
    this.http.post('http://127.0.0.1:5000/v2',dados).subscribe(data => {console.log('my data: ', data);});
    //this.navCtrl.push(MelhorCelularPage, {dados: this.dados}, {animate: true, animation:'pingu', direction: 'forward'});
  };
  public goSobrePistacheiPage(){
    this.navCtrl.push(SobrePistacheiPage, {}, {animate: true, animation:'pingu', direction: 'forward'});
  };
/*    let dados = new URLSearchParams();
    dados.append('precoMax', String(this.dados.controls.precoMax));
    dados.append('camera', String(this.dados.controls.camera));
    dados.append('desempenho', String(this.dados.controls.desempenho));
    dados.append('tela', String(this.dados.controls.tela));
    dados.append('bateria', String(this.dados.controls.bateria));
    dados.append('armazenamento', String(this.dados.controls.armazenamento));
    */
}


