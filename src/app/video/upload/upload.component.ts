import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage,  AngularFireUploadTask } from '@angular/fire/compat/storage';
import { v4 as uuid} from 'uuid'
import { last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy{
  
  isDragover = false
  file: File | null = null
  nextStep = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Clip is being uploaded.'
  isSubmission = false
  showPercentage = false
  percentage = 0
  user : firebase.User | null = null
  task?: AngularFireUploadTask

  title = new FormControl('',{
    validators:[
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable : true
  })

  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(private storage : AngularFireStorage, 
    private auth : AngularFireAuth, 
    private clipService:ClipService,
    private router:Router
  ) {
    auth.user.subscribe(user => this.user = user)
  }

  ngOnDestroy(): void {
    this.task?.cancel()
  }


  storeFile(event : Event){
    this.isDragover = false
    this.file = (event as DragEvent).dataTransfer ?
                (event as DragEvent).dataTransfer?.files.item(0) ?? null :
                (event.target as HTMLInputElement).files?.item(0) ?? null
    
    if(!this.file || this.file.type !== 'video/mp4'){
      return
    }
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''))
    this.nextStep = true
  }

  uploadFile(){
    this.uploadForm.disable()

    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Clip is being uploaded.'
    this.isSubmission = true
    this.showPercentage = true

    const clipName = uuid()
    const clipPath = `clips/${clipName}.mp4`

    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath)

    this.task.percentageChanges().subscribe(progress => {
      this.percentage =  progress as number / 100
    })

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe(({
      next: async (url)=>{
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipName}.mp4`,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          url
        }

        const clipRef = await this.clipService.createClip(clip)

        console.log(clip)
        this.alertColor = 'green'
        this.alertMsg = 'Success! Clip is uploaded'
        this.showPercentage = false

        setTimeout(()=>{
          this.router.navigate([
            'clip',clipRef.id
          ])
        }, 1000)
      },
      error:(error)=>{
        this.uploadForm.enable()
        this.alertColor = 'red'
        this.alertMsg = 'Upload failed! Please try again'
        this.isSubmission = true
        this.showPercentage = false
      }
    }))
  }

}
