import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges{
  

@Input() activeClip: IClip | null = null
@Output() update = new EventEmitter()
isSubmission  = false
showAlert = false
alertColor = 'blue'
alertMsg = 'Please wait! Updating Clip'

constructor(private modal:ModalService,
  private clipService:ClipService
){}

clipID = new FormControl('',{
  nonNullable : true
})

title = new FormControl('',{
  validators:[
    Validators.required,
    Validators.minLength(3)
  ],
  nonNullable : true
})

editForm = new FormGroup({
  title: this.title,
  id:this.clipID
})


  ngOnInit(): void {
    this.modal.registerModal('editClip')
  }

  ngOnDestroy(): void {
    this.modal.unregisterModal('editClip')
  }

  ngOnChanges(): void {
    if(!this.activeClip){
      return
    }
    this.showAlert = false
    this.isSubmission = false
    this.alertColor = 'blue'
    this.clipID.setValue(this.activeClip.docID!)
    this.title.setValue(this.activeClip.title)
  }

  async submit(){
    if(!this.activeClip){
      return
    }
    this.isSubmission = true
    this.showAlert = true
    this.alertMsg = 'Please wait! Updating Clip'

    try{
      await this.clipService.updateClip(this.clipID.value,this.title.value)
    }
    catch(e){
      this.isSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong! Try again'
      return
    }

      this.activeClip.title = this.title.value
      this.update.emit(this.activeClip)

      this.isSubmission = false
      this.alertColor = 'green'
      this.alertMsg = 'Success!'
  }
}
