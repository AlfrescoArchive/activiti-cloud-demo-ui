import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class LoginService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient) {

  }

  login(username: string, password: string){

    this.authService.login(username, password).subscribe( (response) => {
      console.log(response);
    });
  }

}
