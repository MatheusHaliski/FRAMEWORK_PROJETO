import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.createUser(this.email, this.password)
      .then((result) => {
        console.log('User registered successfully!', result);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  }
}

