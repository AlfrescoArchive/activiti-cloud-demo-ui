import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ADF modules
import { AdfModule } from './adf.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminAuthBearerGuard } from './admin-auth-bearer-guard.service';
import { AuthBearerInterceptor } from './auth/auth-bearer.interceptor';
import { AuthenticationService } from './auth/authentication.service';
import { ProcessInstanceService } from './process-instance/process-instance.service';
import { ProcessInstanceComponent } from './process-instance/process-instance.component';

import {
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    // ADF modules
    AdfModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProcessInstanceComponent
  ],
  providers: [
    AdminAuthBearerGuard,
    AuthenticationService,
    [{
      provide: HTTP_INTERCEPTORS, useClass:
        AuthBearerInterceptor, multi: true
    }],
    ProcessInstanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
