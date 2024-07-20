import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar-empleado',
  templateUrl: './nav-bar-empleado.component.html',
  styleUrls: ['./nav-bar-empleado.component.css']
})
export class NavBarEmpleadoComponent {

  constructor(private authService: AuthService, private router: Router) {} 

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
