import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent {
  @Input() title = ''; // Title for the modal
  @ViewChild('popupModal') popupModal!: ElementRef;

  openModal(): void {
    const modalElement = this.popupModal.nativeElement;
    const bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  closeModal(): void {
    const modalElement = this.popupModal.nativeElement;
    const bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
    bootstrapModal.hide();
  }
}
