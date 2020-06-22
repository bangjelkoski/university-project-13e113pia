import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/guards/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { GuestGuardService } from './services/guards/guest/guest.service';
import { LogoComponent } from './components/partials/logo/logo.component';
import { DemoService } from './services/demo/demo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { PasswordComponent } from './auth/password/password.component';
import { RegisterComponent as RegisterPoljoprivrednikComponent } from './poljoprivrednik/auth/register/register.component';
import { RegisterComponent as RegisterPreduzeceComponent } from './preduzece/auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent as AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminGuardService } from './services/guards/admin/admin.service';
import { PoljoprivrednikGuardService } from './services/guards/poljoprivrednik/poljoprivrednik.service';
import { PreduzeceGuardService } from './services/guards/preduzece/preduzece.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminService } from './services/admin/admin.service';
import { PreduzeceService } from './services/preduzece/preduzece.service';
import { HttpService } from './services/http/http.service';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { KorisniciComponent as AdminKorisniciComponent } from './admin/dashboard/korisnici/korisnici.component';
import { PoljoprivredniciComponent as AdminPoljoprivredniciComponent } from './admin/poljoprivrednici/poljoprivrednici.component';
import { PreduzecaComponent as AdminPreduzecaComponent } from './admin/preduzeca/preduzeca.component';
import { KorisnikComponent as AdminKorisnikComponent } from './admin/korisnik/korisnik.component';
import { RouterModule } from '@angular/router';

import { DashboardComponent as PreduzeceDashboardComponent } from './preduzece/dashboard/dashboard.component';
import { ProizvodiComponent as PreduzeceProizvodiComponent } from './preduzece/proizvodi/proizvodi.component';
import { ChartComponent as PreduzeceDashboardChartComponent } from './preduzece/dashboard/chart/chart.component';
import { NarudzbineComponent as PreduzeceNarudzbineComponent } from './preduzece/dashboard/narudzbine/narudzbine.component';
import { ChartsModule } from 'ng2-charts';
import { KurirComponent as PreduzeceKurirComponent } from './preduzece/dashboard/kurir/kurir.component';
import { ProizvodComponent as PreduzeceProizvodComponent } from './preduzece/proizvodi/proizvod/proizvod.component';
import { ProizvodFormComponent as PreduzeceProizvodFormComponent } from './preduzece/proizvodi/proizvod-form/proizvod-form.component';

import { DashboardComponent as PoljoprivrednikDashboardComponent } from './poljoprivrednik/dashboard/dashboard.component';
import { RasadniciComponent as PoljoprivrednikRasadniciComponent } from './poljoprivrednik/dashboard/rasadnici/rasadnici.component';
import { RasadnikComponent as PoljoprivrednikRasadnikComponent } from './poljoprivrednik/rasadnik/rasadnik.component';
import { WaterComponent as WaterModalComponent } from './poljoprivrednik/rasadnik/water/water.component';
import { TemperatureComponent as TemperatureModalComponent } from './poljoprivrednik/rasadnik/temperature/temperature.component';
import { SadnikComponent } from './poljoprivrednik/rasadnik/sadnik/sadnik.component';
import { SadnikNewComponent } from './poljoprivrednik/rasadnik/sadnik-new/sadnik-new.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PreduzeceComponent,
    PoljoprivrednikComponent,
    LoginComponent,
    LogoComponent,
    AuthComponent,
    PasswordComponent,
    RegisterPoljoprivrednikComponent,
    RegisterPreduzeceComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    AdminKorisniciComponent,
    AdminPoljoprivredniciComponent,
    AdminPreduzecaComponent,
    AdminKorisnikComponent,
    PreduzeceDashboardComponent,
    PreduzeceProizvodiComponent,
    PreduzeceDashboardChartComponent,
    PreduzeceNarudzbineComponent,
    PreduzeceKurirComponent,
    PreduzeceProizvodComponent,
    PreduzeceProizvodFormComponent,
    PoljoprivrednikDashboardComponent,
    PoljoprivrednikRasadniciComponent,
    PoljoprivrednikRasadnikComponent,
    WaterModalComponent,
    TemperatureModalComponent,
    SadnikComponent,
    SadnikNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgHcaptchaModule.forRoot({
      siteKey: '10000000-ffff-ffff-ffff-000000000001',
    }),
  ],
  providers: [
    AdminGuardService,
    PoljoprivrednikGuardService,
    PreduzeceGuardService,
    AuthService,
    AuthGuardService,
    StorageService,
    GuestGuardService,
    DemoService,
    AdminService,
    PreduzeceService,
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
