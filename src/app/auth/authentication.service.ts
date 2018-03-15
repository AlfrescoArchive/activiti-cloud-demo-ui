import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';
import { pathApi } from '../utils/path-api';

import moment from 'moment-es6';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private bearerExcludedUrls: string[] =  ['app.config.json', 'assets/', 'assets/adf-core/i18n/'];

  token: string;

  setToken(authResult) {
    const expiresAt = moment().add(authResult.expires_in, 'seconds');
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getToken(): string {
    return localStorage.getItem('id_token');
  }

   getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  getBearerExcludedUrls(): string[] {
    return this.bearerExcludedUrls;
  }

  addTokenToHeader(headersArg?: HttpHeaders): Observable<HttpHeaders> {
    return Observable.create(async (observer: Observer<any>) => {
      let headers = headersArg;
      if (!headers) {
        headers = new HttpHeaders();
      }
      try {
        const token: string = this.getToken();
        headers = headers.set('Authorization', 'bearer ' + token);
        observer.next(headers);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

}
