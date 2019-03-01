import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage {
  data = [
    {type:'message', data:'Olá. Vamos te ajudar a encontrar os melhores smartphones para você. Pronto para começar?'},
    {type:'options', id:'dummy', data:[
      {name: "Sim", value: "sim"}, 
    ]},
    {type:'message', data:'Para você, o que é mais importante em um celular?'},
    {type:'options', id:'atributo1', data:[
      {name: "Câmera", value: "camera", message:"Então você gosta de tirar fotos? Que massa!"}, 
      {name: "Desempenho", value: "desempenho", message:"Uau, então você é desses que quer ficar sempre na frente?"},
      {name: "Tela", value: "tela", message:"Somente HD não é mais suficiente para seus olhos? Tudo bem, eu concordo!"},
      {name: "Armazenamento", value: "armazenamento", message:"\"Memória Cheia\" nunca mais!"},
      {name: "Bateria", value: "bateria", message:"Existe algo pior do que ficar sem bateria no meio do dia? Também concordo que não!"}
    ]},
    {type:'message', data:"Agora, entre essas que sobraram, qual a menos importante?"},
    {type:'options', id:'atributo2', data:[
      {name: "Câmera", value: "camera"}, 
      {name: "Desempenho", value: "desempenho"},
      {name: "Tela", value: "tela"},
      {name: "Armazenamento", value: "armazenamento"},
      {name: "Bateria", value: "bateria"}
    ]},
    {type:'message', data:"Legal, e entre essas funções, qual você mais utiliza?"},
    {type:'options', id:'atributo3', data:[
      {name: "Tirar fotos", value: "fotos"}, 
      {name: "Assistir vídeos", value: "videos"},
      {name: "Jogar", value: "jogos"},
      {name: "Redes Sociais", value: "redes"},
      {name: "Ligações", value: "ligar"}
    ]},
    {type:'message', data:"E por fim, qual o máximo de preço que você quer gastar com o seu próximo smartphone?"},
    {type:'num-value', id:'atributo4', data:'Preço Máximo'}
  ];
  buttons = null; 
  attrib = null;
  inputName = null;
  chats = [];
  results = [];
  numericValue;

  messageId = 0;

  constructor() {
    let d = this.data[0];
    if(d.type === "message"){    
      let msg = {source: "left", message: d.data};
      this.chats.push(msg);
    }
  }

  chooseOption(val,name,messa){
    let r = {id: this.attrib, value: val};
    this.results.push(r);
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
      let r = {id: this.attrib, value: this.numericValue};
      this.results.push(r);

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
    }
    else{
      //TO DO
      //Implementar o envio de dados para a API e resultados
      console.log("fim");
      console.log(this.results);
    }
  }

}
