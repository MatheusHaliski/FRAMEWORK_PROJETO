import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  imagemSelecionada: File | undefined;
  progressoUpload: number | undefined;
  urlImagem: string | undefined;
  buttonClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private storage: AngularFireStorage
  ) {
    this.produtoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]*')]],
      especie: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]*')]],
      imagemUrl: [''] // Se você estiver usando Firebase Firestore, pode remover essa propriedade, pois a URL da imagem será obtida após o upload
    });
  }

  ngOnInit(): void {
    console.log('Qual é o estado do botão: ' + this.buttonClicked);
  }

  onFileSelected(event: any) {
    this.imagemSelecionada = event.target.files[0];
  }

  salvar(): void {
    this.buttonClicked = true;
    console.log('Salvando produto');

    if (this.produtoForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    console.log('Nome: ' + this.produtoForm.value.nome);
    console.log('Espécie: ' + this.produtoForm.value.especie);

    // Se uma imagem foi selecionada, faça o upload
    if (this.imagemSelecionada) {
      const caminhoImagem = `caminho/para/as/imagens/${new Date().getTime()}_${this.imagemSelecionada.name}`;
      const referenciaImagem = this.storage.ref(caminhoImagem);
      const tarefaUpload = this.storage.upload(caminhoImagem, this.imagemSelecionada);

      // Acompanhe o progresso do upload
      tarefaUpload.percentageChanges().subscribe(progresso => {
        this.progressoUpload = progresso;
      });

      // Quando o upload for concluído, obtenha a URL da imagem e salve no banco de dados
      tarefaUpload.snapshotChanges().pipe(
        finalize(() => {
          referenciaImagem.getDownloadURL().subscribe(url => {
            this.urlImagem = url;
            this.produtoForm.patchValue({ imagemUrl: url }); // Se estiver usando Firebase Firestore, atualize o formulário com a URL da imagem
            this.salvarProduto(); // Após obter a URL da imagem, salve o produto no banco de dados
          });
        })
      ).subscribe();
    } else {
      // Se nenhuma imagem foi selecionada, salve apenas os dados do produto no banco de dados
      this.salvarProduto();
    }
  }

  salvarProduto(): void {
    const produtoData = this.produtoForm.value;
    this.produtoService.adicionarProduto(produtoData)
      .then(() => {
        console.log('Produto adicionado com sucesso!');
        this.produtoForm.reset();
        this.buttonClicked = false;
      })
      .catch((error: any) => console.error('Erro ao adicionar produto:', error));
  }
}
