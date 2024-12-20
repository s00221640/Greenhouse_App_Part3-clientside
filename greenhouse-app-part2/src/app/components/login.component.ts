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
    <h2 *ngIf="isLoginMode">Login</h2>
    <h2 *ngIf="!isLoginMode">Sign Up</h2>
    <form (ngSubmit)="onSubmit()">
  <div *ngIf="!isLoginMode">
    <label for="username">Username:</label>
    <input type="text" [(ngModel)]="username" name="username" />
    <br />
  </div>
  <label for="email">Email:</label>
  <input type="email" [(ngModel)]="email" name="email" required />
  <br />
  <label for="password">Password:</label>
  <input type="password" [(ngModel)]="password" name="password" required />
  <br />
  <button type="submit">{{ isLoginMode ? 'Login' : 'Sign Up' }}</button>
</form>
<button (click)="toggleMode()">Switch to {{ isLoginMode ? 'Sign Up' : 'Login' }}</button>
<p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>

  `,
})
export class LoginComponent {
    username: string = ''; // Add username
    email: string = '';
    password: string = '';
    isLoginMode: boolean = true;
    errorMessage: string | null = null;
  
    private loginUrl = 'http://localhost:3000/users/login';
    private signupUrl = 'http://localhost:3000/users/register';
  
    constructor(private http: HttpClient, private router: Router) {}
  
    toggleMode(): void {
      this.isLoginMode = !this.isLoginMode;
    }
  
    onSubmit(): void {
      const url = this.isLoginMode ? this.loginUrl : this.signupUrl;
      const payload = this.isLoginMode
        ? { email: this.email, password: this.password }
        : { username: this.username, email: this.email, password: this.password }; // Include username for signup
  
      console.log('Submitting request:', payload);
  
      this.http.post<{ token?: string }>(url, payload).subscribe({
        next: (response) => {
          if (this.isLoginMode) {
            localStorage.setItem('token', response.token!);
            this.router.navigate(['/']);
          } else {
            alert('Signup successful! Please login.');
            this.isLoginMode = true;
          }
        },
        error: (err) => {
          console.error('Error during request:', err);
          this.errorMessage = err.error.message || 'An error occurred.';
        },
      });
    }
  }
  
