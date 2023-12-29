import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public modal : ModalService,
    public auth : AuthService,
    public authf : AngularFireAuth
    )
    {}

  openModal(event : Event){
    event.preventDefault()
    this.modal.toggleModal('auth')
  }
  ngOnInit(): void {
    
  }

  async logout($event:Event){
    $event.preventDefault()
    await this.authf.signOut()
  }
}
