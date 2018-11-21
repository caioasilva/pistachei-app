import { TooltipsModule } from 'ionic-tooltips';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Config, Platform } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { EscolhaPage } from '../pages/escolha/escolha';
import { MelhorCelularPage } from '../pages/melhorcelular/melhorcelular';
import { SobrePistacheiPage } from '../pages/sobrepistachei/sobrepistachei';
import { InstrucoesPage } from '../pages/intrucoes/instrucoes';

import { TypingAnimationDirective } from 'angular-typing-animation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SlideTransition } from '../customclasses/slide.transition';
import { SlideDownTransition } from '../customclasses/slide-down.transition';
import { SlideUpTransition } from '../customclasses/slide-up.transition';
import { PinguTransition } from '../customclasses/pingu-transition';

import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
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
export class AppModule {
    constructor( private config: Config, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.config.setTransition("slide", SlideTransition);
        this.config.setTransition("slidedown", SlideDownTransition);
        this.config.setTransition("slideup", SlideUpTransition);
        this.config.setTransition("pingu", PinguTransition);
        platform.ready().then(() => {
            statusBar.styleDefault();
            if (platform.is('android')) {
                statusBar.overlaysWebView(false);
                statusBar.backgroundColorByHexString('#34b866');
            }
            splashScreen.hide();
        });
    }
}

