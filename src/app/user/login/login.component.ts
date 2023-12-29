import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth : AngularFireAuth){}
  credential = {
    email : '',
    password : ''
  }
  showAlert = false
  alertMessage = 'Please wait while we logging you in'
  alertColor = 'blue'
  inSubmission = false

  async login(){
    this.showAlert = true
    this.alertMessage = 'Please wait while we logging you in'
    this.alertColor = 'blue'
    this.inSubmission = true

    try{
      await this.auth.signInWithEmailAndPassword(
        this.credential.email,
        this.credential.password)
    }
    catch(ex){
      this.showAlert = true
      this.alertMessage = 'Error occured while logged in! Please try again'
      this.alertColor = 'red'
      this.inSubmission = false

      return
    }

    this.alertMessage = 'Success! You are logged in'
    this.alertColor = 'green'
  }
}
