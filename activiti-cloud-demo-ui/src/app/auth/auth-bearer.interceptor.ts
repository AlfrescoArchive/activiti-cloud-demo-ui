import { Injectable, Injector, forwardRef } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {
    private excludedUrlsRegex: RegExp[];
    private authService: AuthenticationService;

    constructor(private injector: Injector) { }

    private loadExcludedUrlsRegex() {
        const excludedUrls: string[] = this.authService.getBearerExcludedUrls();
        this.excludedUrlsRegex = excludedUrls.map(urlPattern => new RegExp(urlPattern, 'gi')) || [];

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.authService = this.injector.get(AuthenticationService);

        if (!this.authService || !this.authService.getBearerExcludedUrls()) {
            return next.handle(req);
        }

        if (!this.excludedUrlsRegex) {
            this.loadExcludedUrlsRegex();
        }

        const urlRequest = req.url;
        const shallPass: boolean = !!this.excludedUrlsRegex.find(regex => regex.test(urlRequest));
        if (shallPass) {
            return next.handle(req);
        }

        if (this.authService.isLoggedIn()) {
            return this.authService.addTokenToHeader(req.headers).mergeMap(headersWithBearer => {
                const kcReq = req.clone({ headers: headersWithBearer });
                return next.handle(kcReq);
            });

        } else {
            this.authService.logout();
            return next.handle(req);
        }
    }
}
