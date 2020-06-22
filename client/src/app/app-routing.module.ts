import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GuestGuardService } from './services/guards/guest/guest.service';
import { AdminComponent } from './admin/admin.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { AuthGuardService } from './services/guards/auth/auth.service';
import { RegisterComponent as RegisterPoljoprivrednikComponent } from './poljoprivrednik/auth/register/register.component';
import { RegisterComponent as RegisterPreduzeceComponent } from './preduzece/auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { PasswordComponent } from './auth/password/password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuardService } from './services/guards/admin/admin.service';
import { PreduzeceGuardService } from './services/guards/preduzece/preduzece.service';
import { DashboardComponent as AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { DashboardComponent as PreduzeceDashboardComponent } from './preduzece/dashboard/dashboard.component';
import { PoljoprivredniciComponent as AdminPoljoprivredniciComponent } from './admin/poljoprivrednici/poljoprivrednici.component';
import { PreduzecaComponent as AdminPreduzecaComponent } from './admin/preduzeca/preduzeca.component';
import { ProizvodiComponent as PreduzeceProizvodiComponent } from './preduzece/proizvodi/proizvodi.component';
import { KorisnikComponent as AdminKorisnikComponent } from './admin/korisnik/korisnik.component';
import { ProizvodComponent as PreduzeceProizvodComponent } from './preduzece/proizvodi/proizvod/proizvod.component';
import { ProizvodFormComponent as PreduzeceProizvodFormComponent } from './preduzece/proizvodi/proizvod-form/proizvod-form.component';
import { PoljoprivrednikGuardService } from './services/guards/poljoprivrednik/poljoprivrednik.service';

import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { DashboardComponent as PoljoprivrednikDashboardComponent } from './poljoprivrednik/dashboard/dashboard.component';
import { RasadnikComponent as PoljoprivrednikRasadnikComponent } from './poljoprivrednik/rasadnik/rasadnik.component';
import { MagacinComponent as PoljoprivrednikMagacinComponent } from './poljoprivrednik/magacin/magacin.component';
import { ProdavnicaComponent as PoljoprivrednikProdavnicaComponent } from './poljoprivrednik/prodavnica/prodavnica.component';
import { ProizvodComponent as PoljoprivrednikProizvodComponent } from './poljoprivrednik/prodavnica/proizvod/proizvod.component';

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
    component: PoljoprivrednikComponent,
    canActivate: [AuthGuardService, PoljoprivrednikGuardService],
    children: [
      {
        path: '',
        component: PoljoprivrednikDashboardComponent,
      },
      {
        path: 'rasadnik/:id',
        component: PoljoprivrednikRasadnikComponent,
      },
      {
        path: 'rasadnik/:id/magacin',
        component: PoljoprivrednikMagacinComponent,
      },
      {
        path: 'prodavnica/:preduzeceId/proizvod/:id',
        component: PoljoprivrednikProizvodComponent,
      },
      {
        path: 'prodavnica',
        component: PoljoprivrednikProdavnicaComponent,
      },
    ],
  },
  {
    path: 'preduzece',
    component: PreduzeceComponent,
    canActivate: [AuthGuardService, PreduzeceGuardService],
    children: [
      {
        path: '',
        component: PreduzeceDashboardComponent,
      },
      {
        path: 'proizvodi',
        component: PreduzeceProizvodiComponent,
      },
      {
        path: 'proizvodi/new',
        component: PreduzeceProizvodFormComponent,
      },
      {
        path: 'proizvodi/:id',
        component: PreduzeceProizvodComponent,
      },
    ],
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
