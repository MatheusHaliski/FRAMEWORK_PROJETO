import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent {
  @ViewChild('modalEditar') modalEditarRef!: ElementRef<HTMLDivElement>;
  @ViewChild('modalAgendar') modalAgendarRef!: ElementRef<HTMLDivElement>; // Referência para o modal de agendamento
  produtos: any[] = []; // Array para armazenar os produtos
  produtoEditado: any = []; // Declaração da propriedade produtoEditado
  dataVisita: string = '';
  horaVisita: string = '';
  idUsuario: string = '';
  nome: string = '';
  constructor(private produtoService: ProdutoService) { }

  ngAfterViewInit() {
    this.getProdutos();
  }

  openModalEditar(produto:any) {
    this.nome = produto.nome;
    const modalEditar = this.modalEditarRef.nativeElement;
    modalEditar.style.display = "block";
    this.produtoEditado = { ...produto }; // Copia os detalhes do produto para edição
  }

  closeModalEditar() {
    const modalEditar = this.modalEditarRef.nativeElement;
    modalEditar.style.display = "none";
  }

  salvarEdicao() {
    this.produtoService.editarProduto(this.produtoEditado.key, {
      nome: this.produtoEditado.nome,
      especie: this.produtoEditado.especie
    }).then(() => {
      console.log("Produto editado:", this.produtoEditado.key);
      this.closeModalEditar();
    }).catch(error => {
      console.error("Erro ao editar produto:", error);
    });
  }

  openModalAgendar(produto: any) {
    this.produtoEditado = produto;
    const modalAgendar = this.modalAgendarRef.nativeElement;
    modalAgendar.style.display = "block";
    // Lógica para exibir o modal de agendamento
  }

  closeModalAgendar() {
    const modalAgendar = this.modalAgendarRef.nativeElement;
    modalAgendar.style.display = "none";
    // Lógica para fechar o modal de agendamento
  }

  confirmarAgendamento() {
    this.nome = this.produtoEditado.nome;
    console.log(this.produtoEditado);
    this.produtoService.agendarVisita(this.nome,this.produtoEditado.key, this.dataVisita, this.horaVisita,this.idUsuario).then(() => {
      console.log("Visita agendada para o produto:", this.produtoEditado.key);
      this.closeModalAgendar();
    }).catch(error => {
      console.error("Erro ao agendar visita:", error);
    });
  }
  

  getProdutos() {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  excluirProduto(key: string) {
    this.produtoService.excluirProduto(key).then(() => {
      console.log("Produto excluído:", key);
    }).catch(error => {
      console.error("Erro ao excluir produto:", error);
    });
  }
}
