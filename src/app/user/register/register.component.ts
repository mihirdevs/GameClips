import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService:AuthService, 
    private emailTaken: EmailTaken)
    {}

  inSubmission = false
  name = new FormControl('', [
    Validators.required, 
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required, 
    Validators.email
  ], [this.emailTaken.validate])
  password = new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  age = new FormControl<number | null>(null , [
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
  },[RegisterValidators.match('password','confirmpassword')])

  async register(){
    this.showAlert = true
    this.alertMessage = 'Please wait while account is being created'
    this.alertColor = 'blue'
    this.inSubmission = true

    try{
        await this.authService.createUser(this.registerform.value as IUser)
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
