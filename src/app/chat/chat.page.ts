import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage {

  buttons = null; 
  attrib = null;
  inputName = null;
  chats = [];
  results: { [id: string] : string; } = {};
  numericValue;
  messageId = -1;
  data = [];

  constructor(public api: ApiService, public loadingController: LoadingController, 
    public router: Router, public route: ActivatedRoute) {
    // let d = this.data[0];
    // if(d.type === "message"){    
    //   let msg = {source: "left", message: d.data};
    //   this.chats.push(msg);
    // }
  }

  async getChatScript() {

    await this.api.getChatScript()
      .subscribe(res => {
        this.data = res;
        this.nextMessage();
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.getChatScript();
  }

  async getResult(input){
    const loading = await this.loadingController.create({
      message: 'Calculando!'
    });
    await loading.present();
    await this.api.getResult(input)
    .subscribe(res => {
        console.log(res);
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
      });
  }
  chooseOption(val,name,messa){
    this.results[this.attrib] = val;
    this.buttons = null;
    this.attrib = null;
    let msg = {source: "right", message: name};
    this.chats.push(msg);
    if(messa){
      let msg2 = {source: "left", message: messa};
      this.chats.push(msg2);
    }else{
      this.nextMessage();
    }
  }

  setValue(){
    if(this.numericValue>0){
      this.results[this.attrib] = this.numericValue;
      this.inputName = null;
      this.attrib = null;
      let msg = {source: "right", message: "R$ "+this.numericValue};
      this.chats.push(msg);
      this.nextMessage();
    }else{
      let msg = {source: "left", message: "Hmm, parece que esse valor é inválido. Tente digitar novamente!"};
      this.chats.push(msg);
    }
  }

  nextMessage(){
    this.messageId += 1;
    if(this.messageId < this.data.length){
      let d = this.data[this.messageId];
      if (d.type === "message"){
        let msg = {source: "left", message: d.data};
        this.chats.push(msg);
      }else if(d.type === "options"){
        this.buttons = d.data;
        this.attrib = d.id;
      }else if(d.type === "num-value"){
        this.inputName = d.data;
        this.attrib = d.id;
      }
    }else{
      //TO DO
      //Implementar o envio de dados para a API e resultados
      // console.log(this.results);
      let resp = this.getResult(this.results);
      // console.log(resp);
      this.router.navigate(['/celulares', { response: resp }]);
    }
  }

}
