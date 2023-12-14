import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalId = ''
  constructor(
    public modal : ModalService,
    public ele : ElementRef
    ){
    
  }

  closeModal(){
    this.modal.toggleModal(this.modalId)
  }
  ngOnInit(): void{
    document.body.appendChild(this.ele.nativeElement)
  }
}
