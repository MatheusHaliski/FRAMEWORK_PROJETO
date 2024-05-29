import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private db: AngularFireDatabase) {}

  getProdutos(): Observable<any[]> {
    return this.db.list<any>('produtos').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val();
          return { key: c.payload.key, nome: data.nome, ...data };
        });
      })
    );
  }
  

  editarProduto(key: string, novosDados: any): Promise<void> {
    return this.db.object(`produtos/${key}`).update(novosDados);
  }

  adicionarProduto(produtoData: any): Promise<void>  {
    return this.db.list('produtos').push(produtoData).then(() => {});
  }

  excluirProduto(key: string): Promise<void> {
    return this.db.list('produtos').remove(key);
  }

  // Funções adicionadas para manipular usuários

  getUsuarios(): Observable<any[]> {
    return this.db.list<any>('usuarios').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  editarUsuario(key: string, novosDados: any): Promise<void> {
    return this.db.object(`usuarios/${key}`).update(novosDados);
  }

  adicionarUsuario(usuarioData: any): Promise<void> {
    return this.db.list('usuarios').push(usuarioData).then(() => {});
  }

  excluirUsuario(key: string): Promise<void> {
    return this.db.list('usuarios').remove(key);
  }

  agendarVisita(nome:string, produtoKey: string, dataVisita: string, horaVisita: string, idUsuario: string): Promise<void> {
    // Criar um objeto com os detalhes do agendamento
    const agendamento = {
      produtoId: produtoKey,
      dataVisita: dataVisita,
      horaVisita: horaVisita,
      nome: nome,
      idUsuario:idUsuario
    };
  
    // Tentar buscar a referência do usuário pelo ID fornecido
    return new Promise<void>((resolve, reject) => {
      this.db.object(`usuarios/${idUsuario}`).valueChanges().subscribe((usuario: any) => {
        if (usuario) {
          // Verificar se o usuário possui o campo de agendamentos
          if (!usuario.agendamentos) {
            usuario.agendamentos = []; // Se não existir, inicialize-o como um array vazio
          }
          // Verificar se o agendamento já existe no array de agendamentos
          const existeAgendamento = usuario.agendamentos.some((agendamentoExistente: any) => {
            return agendamentoExistente.horaVisita === agendamento.horaVisita && agendamentoExistente.produtoId === agendamento.produtoId && agendamentoExistente.dataVisita === agendamento.dataVisita;
          });
          // Se o agendamento ainda não estiver realizado, adicionar ao campo de agendamentos do usuário
          if (!existeAgendamento) {
            usuario.agendamentos.push(agendamento); // Adiciona o objeto completo de agendamento
            // Atualizar os dados do usuário na base de dados
            this.db.object(`usuarios/${idUsuario}`).update(usuario).then(() => {
              resolve();
            }).catch(error => {
              reject(error);
            });
          } else {
            // Se o agendamento já estiver realizado, apenas resolver a promessa
            resolve();
          }
        } else {
          reject(new Error('Usuário não encontrado.'));
        }
      });
    });
  }

}