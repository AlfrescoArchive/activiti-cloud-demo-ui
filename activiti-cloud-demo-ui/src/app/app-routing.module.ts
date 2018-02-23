import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProcessInstanceComponent } from './process-instance/process-instance.component';
import { GraphqlComponent } from './graphql/graphql.component';
import { AdminAuthBearerGuard } from './admin-auth-bearer-guard.service';

const routes: Routes = [
   { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'graphql',
    component: GraphqlComponent,
    canActivate: [ AdminAuthBearerGuard ]
  },
  {
    path: 'process-instance',
    component: ProcessInstanceComponent,
    canActivate: [ AdminAuthBearerGuard ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
