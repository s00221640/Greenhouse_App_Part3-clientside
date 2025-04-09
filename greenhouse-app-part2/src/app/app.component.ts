import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './components/tempAuthService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav style="display: flex; justify-content: center; background-color: #d8f3dc; padding: 10px;">
      <a *ngIf="authService.isLoggedIn()" routerLink="/" style="text-decoration: none; color: #2d6a4f; font-size: 1.2rem; font-weight: bold; margin-right: 20px;">Home</a>
      <a *ngIf="authService.isLoggedIn()" routerLink="/create" style="text-decoration: none; color: #2d6a4f; font-size: 1.2rem; font-weight: bold; margin-right: 20px;">Create Plant</a>
      <a *ngIf="authService.isLoggedIn()" routerLink="/edit/1" style="text-decoration: none; color: #2d6a4f; font-size: 1.2rem; font-weight: bold; margin-right: 20px;">Edit Plant</a>
      <a *ngIf="!authService.isLoggedIn()" routerLink="/login" style="text-decoration: none; color: #2d6a4f; font-size: 1.2rem; font-weight: bold; margin-right: 20px;">Login</a>
      <div *ngIf="currentUser" style="margin-right: 20px; color: #2d6a4f; font-size: 1rem; display: flex; align-items: center;">
        <span>Logged in as: <strong>{{currentUser.email}}</strong></span>
      </div>
      <button *ngIf="authService.isLoggedIn()" (click)="logout()" style="background-color: #95d5b2; border: none; padding: 5px 10px; color: #fff; font-size: 1rem; cursor: pointer; border-radius: 5px;">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  currentUser: any = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserInfo();
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  loadUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        this.currentUser = JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Error parsing token');
        this.currentUser = null;
      }
    }
  }

  logout(): void {
    this.authService.clearToken();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}