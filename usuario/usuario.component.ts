import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  nome: FormControl = new FormControl('', 
    [Validators.required, Validators.pattern('[a-zA-ZÀ-ú ]*')]);
    dataNascimento: FormControl = new FormControl('');
  buttonClicked: boolean = false;
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: ProdutoService) {
    this.usuarioForm = this.fb.group({
      nome: this.nome,
      dataNascimento: this.dataNascimento
      // Outros campos do formulário...
    });
  } 

  ngOnInit(): void {
    console.log('qual é estado do botao: '+this.buttonClicked);
  }

  salvar(): void {
    this.buttonClicked = true;
    console.log('qual é estado do botao:  '+this.buttonClicked);
    console.log('Salvando usuário');

    if (this.nome.invalid || this.dataNascimento.invalid) {
      console.log('Dados inválidos');
      return;
    }

    console.log('Nome: ' + this.nome.value);
    console.log('Agendamento: ' + this.dataNascimento.value);

    const usuarioData = this.usuarioForm.value;
    this.userService.adicionarUsuario(usuarioData)
      .then(() => {
        console.log('Usuário adicionado com sucesso!');
        this.usuarioForm.reset();
      })
      .catch((error: any) => console.error('Erro ao adicionar usuário:', error));
  }
}
