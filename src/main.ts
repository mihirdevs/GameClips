import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { environment } from './environments/environment.development';
import { enableProdMode } from '@angular/core';

// if(environment.production){
//   enableProdMode()
// }

firebase.initializeApp(environment.firebase)

let appInit = false

firebase.auth().onAuthStateChanged(() => {
  if(!appInit){
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  }
  appInit = true
})


