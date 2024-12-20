import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onSubmit()">
      <label for="email">Email:</label>
      <input type="email" [(ngModel)]="email" name="email" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" [(ngModel)]="password" name="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
    <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
  `,
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.http
      .post<{ token: string }>(this.apiUrl, { email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Store the JWT token
          this.router.navigate(['/']); // Redirect to the home page
        },
        error: (err) => {
          this.errorMessage = 'Invalid email or password.';
        },
      });
  }
}
