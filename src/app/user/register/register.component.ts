import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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

  register(){
    this.showAlert = true
    this.alertMessage = 'Please wait while account is being created'
    this.alertColor = 'blue'
  }
}
