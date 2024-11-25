import { Component, ViewChild } from '@angular/core';
import { PopupModalComponent } from './popup-modal/popup-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-angular15-app';
  @ViewChild('popup') popup!: PopupModalComponent;

  openTaskModal(): void {
    this.popup.openModal();
  }
}
