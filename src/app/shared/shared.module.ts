import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabComponent } from './tab/tab.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { AlertComponent } from './alert/alert.component';
import { EventBlockerDirective } from './dirrectives/event-blocker.directive';

@NgModule({
  declarations: [
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  exports:[
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  providers:[
    provideEnvironmentNgxMask()
  ]
})
export class SharedModule { }
