import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService, MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from './modal/modal.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.items = db.list('produtos').valueChanges(); // Substitua 'produtos' pelo caminho correto no seu Realtime Database
  }
}