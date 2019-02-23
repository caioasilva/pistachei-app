import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MelhorcelularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-melhorcelular',
  templateUrl: 'melhorcelular.html',
})

export class MelhorCelularPage {
  resultado = Array;
  primeiro = Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resultado = navParams.get('resultado');
    this.primeiro = this.resultado[0];
  

    console.log(this.resultado)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MelhorCelularPage');
  }

}
