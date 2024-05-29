import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app'; // Importe o pacote do Firebase
@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  constructor(private db: AngularFireDatabase) {}

  // Método para adicionar um produto
  adicionarProduto(produtoData: any): firebase.database.ThenableReference {
    return this.db.list('produtos').push(produtoData);
  }

  // Método para obter todos os produtos
  getProdutos(): Observable<any[]> {
    return this.db.list('produtos').valueChanges();
  }

  // Outros métodos conforme necessário (ex: atualizar, deletar, etc.)
}
