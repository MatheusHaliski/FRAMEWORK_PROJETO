import { Component,ViewChild,ElementRef } from '@angular/core';
import { Form, FormControl, Validators,FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { ProdutoService } from '../produto.service';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importe o AngularFirestore
@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent {
  @ViewChild('myModal') modalRef!: ElementRef<HTMLDivElement>; // Referência para o modal
  produtos: any[] = []; // Array para armazenar os produtos

  constructor(private firestore: AngularFirestore) {} // Injete o AngularFirestore no construtor

  ngOnInit() {
    this.getProdutos(); // Chame a função para obter os produtos ao inicializar o componente
  }

  openModal() {
    const modal = this.modalRef.nativeElement;
    modal.style.display = "block";
  }

  closeModal() {
    const modal = this.modalRef.nativeElement;
    modal.style.display = "none";
  }

  // Função para obter os produtos do Firestore
  getProdutos() {
    this.firestore.collection('produtos').valueChanges().subscribe((data: any[]) => {
      this.produtos = data; // Atribua os dados ao array de produtos
    });
  }
}