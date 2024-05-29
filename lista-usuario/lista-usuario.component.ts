import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent {
  @ViewChild('modalEditar') modalEditarRef!: ElementRef<HTMLDivElement>;
  usuarios: any[] = []; // Array para armazenar os usuários
  usuarioEditado: any = []; // Declaração da propriedade usuarioEditado

  constructor(private produtoservice: ProdutoService) { }

  ngAfterViewInit() {
    this.getUsuarios();
  }

  openModalEditar(usuario: any) {
    const modalEditar = this.modalEditarRef.nativeElement;
    modalEditar.style.display = "block";
    this.usuarioEditado = { ...usuario }; // Copia os detalhes do usuário para edição
  }

  closeModalEditar() {
    const modalEditar = this.modalEditarRef.nativeElement;
    modalEditar.style.display = "none";
  }

  salvarEdicao() {
    this.produtoservice.editarUsuario(this.usuarioEditado.key, {
      nome: this.usuarioEditado.nome,
      dataNascimento: this.usuarioEditado.dataNascimento
    }).then(() => {
      console.log("Usuário editado:", this.usuarioEditado.key);
      this.closeModalEditar();
    }).catch(error => {
      console.error("Erro ao editar usuário:", error);
    });
  }

  getUsuarios() {
    this.produtoservice.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  excluirUsuario(key: string) {
    this.produtoservice.excluirUsuario(key).then(() => {
      console.log("Usuário excluído:", key);
    }).catch(error => {
      console.error("Erro ao excluir usuário:", error);
    });
  }
}
