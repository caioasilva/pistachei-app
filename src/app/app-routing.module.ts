import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', redirectTo: 'home', pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule' 
  },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatPageModule'
  }
  // ,
  // {
  //   path: 'result',
  //   loadChildren: './result/result.module#ListPageModule'
  // },
  // {
  //   path: 'help',
  //   loadChildren: './help/help.module#HelpPageModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
