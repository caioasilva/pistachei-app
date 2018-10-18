import { TooltipsModule } from 'ionic-tooltips';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { EscolhaPage } from '../pages/escolha/escolha';
import { SobreNosPage } from '../pages/sobrenos/sobrenos';
import { MelhorCelularPage } from '../pages/melhorcelular/melhorcelular';
import { SobrePistacheiPage } from '../pages/sobrepistachei/sobrepistachei';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    EscolhaPage,
    MelhorCelularPage,
    SobreNosPage,
    SobrePistacheiPage,
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
    SobreNosPage,
    SobrePistacheiPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
