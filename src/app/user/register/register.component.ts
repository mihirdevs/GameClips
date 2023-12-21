import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/compat/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth : AngularFireAuth){}

  inSubmission = false
  name = new FormControl('', [
    Validators.required, 
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required, 
    Validators.email
  ])
  password = new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  age = new FormControl('', [
    Validators.required, 
    Validators.min(18),
    Validators.max(100)
  ])
  confirmpassword = new FormControl('',[
    Validators.required
  ])
  phone = new FormControl('',[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)
  ])
  showAlert = false
  alertMessage = 'Please wait while account is being created'
  alertColor = 'blue'

  registerform = new FormGroup({
    name : this.name,
    email : this.email,
    password : this.password,
    age : this.age,
    confirmpassword : this.confirmpassword,
    phone : this.phone
  })

  async register(){
    this.showAlert = true
    this.alertMessage = 'Please wait while account is being created'
    this.alertColor = 'blue'
    this.inSubmission = true

    const {email,password} = this.registerform.value

    try{
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email as string, password as string
    );  
    console.log(userCredential);
    }
    catch(e){
      console.log(e);
      this.alertMessage = 'Error occured while regestering'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }

    this.alertMessage = 'Your account is created'
    this.alertColor = 'green'
  }
}
