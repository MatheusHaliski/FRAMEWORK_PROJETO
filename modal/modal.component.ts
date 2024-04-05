import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @ViewChild('myModal') modalRef!: ElementRef<HTMLDivElement>; // Referência para o modal

  openModal() {
    const modal = this.modalRef.nativeElement;
    modal.style.display = "block";
  }

  closeModal() {
    const modal = this.modalRef.nativeElement;
    modal.style.display = "none";
  }
}
