import { TooltipsModule } from 'ionic-tooltips';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { EscolhaPage } from '../pages/escolha/escolha';
import { MelhorCelularPage } from '../pages/melhorcelular/melhorcelular';
import { SobrePistacheiPage } from '../pages/sobrepistachei/sobrepistachei';
import { InstrucoesPage } from '../pages/intrucoes/instrucoes';

import { TypingAnimationDirective } from 'angular-typing-animation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    EscolhaPage,
    MelhorCelularPage,
    SobrePistacheiPage,
    InstrucoesPage,
    TypingAnimationDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    TooltipsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    EscolhaPage,
    MelhorCelularPage,
    SobrePistacheiPage,
    InstrucoesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
