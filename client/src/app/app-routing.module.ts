import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GuestService } from './services/guest/guest.service';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { RegisterComponent as RegisterPoljoprivrednikComponent } from './poljoprivrednik/auth/register/register.component';
import { RegisterComponent as RegisterPreduzetnikComponent } from './preduzece/auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { PasswordComponent } from './auth/password/password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [GuestService],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'password',
        component: PasswordComponent,
      },
      {
        path: 'poljoprivrednik/register',
        component: RegisterPoljoprivrednikComponent,
      },
      {
        path: 'preduzetnik/register',
        component: RegisterPreduzetnikComponent,
      },
    ],
  },
  {
    path: 'poljoprivrednik',
    children: [],
  },
  {
    path: 'preduzetnik',
    children: [],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      //
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
