import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GuestGuardService } from './services/guards/guest/guest.service';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './services/guards/auth/auth.service';
import { RegisterComponent as RegisterPoljoprivrednikComponent } from './poljoprivrednik/auth/register/register.component';
import { RegisterComponent as RegisterPreduzeceComponent } from './preduzece/auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { PasswordComponent } from './auth/password/password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuardService } from './services/guards/admin/admin.service';
import { DashboardComponent as AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { PoljoprivredniciComponent as AdminPoljoprivredniciComponent } from './admin/poljoprivrednici/poljoprivrednici.component';
import { PreduzecaComponent as AdminPreduzecaComponent } from './admin/preduzeca/preduzeca.component';
import { KorisnikComponent as AdminKorisnikComponent } from './admin/korisnik/korisnik.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [GuestGuardService],
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
        path: 'preduzece/register',
        component: RegisterPreduzeceComponent,
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
    canActivate: [AuthGuardService, AdminGuardService],
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'preduzeca',
        component: AdminPreduzecaComponent,
      },
      {
        path: 'korisnik/:id',
        component: AdminKorisnikComponent,
      },
      {
        path: 'poljoprivrednici',
        component: AdminPoljoprivredniciComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
