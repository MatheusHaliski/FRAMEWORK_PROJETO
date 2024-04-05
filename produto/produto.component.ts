import { Component } from '@angular/core';
import { Form, FormControl, Validators,FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { ProdutoService } from '../produto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent {

  nome: FormControl = new FormControl('', 
    [Validators.required,Validators.pattern('[a-zA-ZÀ-ú ]*')]);
      buttonClicked: boolean = false;
  produtoForm: FormGroup;
  especie: FormControl = new FormControl('', 
  [Validators.required,Validators.pattern('[a-zA-ZÀ-ú ]*')]);
      constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
        this.produtoForm = this.fb.group({
          nome: this.nome,
          especie:this.especie
          // Outros campos do formulário...
        });
      } 

  ngOnInit(): void {
    console.log('qual é estado do botao: '+this.buttonClicked);
  }

  salvar(): void {

    this.buttonClicked = true;
    console.log('qual é estado do botao:  '+this.buttonClicked);
    console.log('Salvando produto');

    if (this.nome.invalid) {
      console.log('Nome inválido');
      return;
    }
    console.log('Nome: ' + this.nome.value);
    const produtoData = this.produtoForm.value;
    this.produtoService.adicionarProduto(produtoData)
      .then(() => {
        console.log('Produto adicionado com sucesso!');
        this.produtoForm.reset();
      })
      .catch(error => console.error('Erro ao adicionar produto:', error));
  }
  }



