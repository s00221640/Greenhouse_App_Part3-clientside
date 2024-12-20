import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './components/tempAuthService';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule], // Include CommonModule here
  template: `
    <nav>
      <a *ngIf="authService.isLoggedIn()" routerLink="/">Home</a>
      <a *ngIf="authService.isLoggedIn()" routerLink="/create">Create Plant</a>
      <a *ngIf="authService.isLoggedIn()" routerLink="/edit/1">Edit Plant</a>
      <a *ngIf="!authService.isLoggedIn()" routerLink="/login">Login</a>
      <button *ngIf="authService.isLoggedIn()" (click)="logout()">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
