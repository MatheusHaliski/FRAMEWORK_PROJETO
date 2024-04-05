import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private firestore:  AngularFirestore) { }

  // Método para adicionar um novo produto ao banco de dados
  adicionarProduto(produto: any): Promise<any> {
    // Retorna uma promessa que será resolvida quando a operação for concluída
    return this.firestore.collection('produtos').add(produto);
  }
}
