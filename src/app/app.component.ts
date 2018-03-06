import { Component } from '@angular/core';
import { TranslationService } from '@alfresco/adf-core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  auth: AuthenticationService;

  constructor(translationService: TranslationService,
              authService: AuthenticationService,
              private router: Router) {
    translationService.use('en');
    this.auth = authService;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
