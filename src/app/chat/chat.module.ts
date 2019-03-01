import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';

import { TypingAnimationModule } from 'angular-typing-animation'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypingAnimationModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatPage
      }
    ])
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
