import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.css']
})
export class NavBarAdminComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    console.log('Logout button clicked');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}