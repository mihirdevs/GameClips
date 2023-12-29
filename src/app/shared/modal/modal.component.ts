import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit,OnDestroy {

  @Input() modalId = ''
  constructor(
    public modal : ModalService,
    public ele : ElementRef
    ){
    
  }
  ngOnDestroy(): void {
    document.body.removeChild(this.ele.nativeElement)
  }

  closeModal(){
    this.modal.toggleModal(this.modalId)
  }
  ngOnInit(): void{
    document.body.appendChild(this.ele.nativeElement)
  }
}
