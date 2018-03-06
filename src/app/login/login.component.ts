import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private authenticationService: AuthenticationService, private router: Router) {

    }

    onLogin($event) {
      this.authenticationService.setToken($event.token.ticket);
      this.router.navigate(['/home']);
    }

}
