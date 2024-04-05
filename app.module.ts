import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoComponent } from './produto/produto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { ModalComponent } from './modal/modal.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms'; // 
@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    UsuarioComponent,
    LayoutComponent,
    LoginComponent,
    ListaUsuarioComponent,
    ListaProdutoComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
