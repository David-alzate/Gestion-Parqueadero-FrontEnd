import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRole: string | null = null;

  constructor() {
    this.userRole = localStorage.getItem('userRole');
  }

  isAuthenticated(): boolean {
    return !!this.userRole;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  login(role: string): void {
    this.userRole = role;
    localStorage.setItem('userRole', role);
  }

  logout(): void {
    this.userRole = null;
    localStorage.removeItem('userRole');
  }
}