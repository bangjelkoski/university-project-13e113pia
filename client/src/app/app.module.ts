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
import { RegisterComponent as RegisterPreduzetnikComponent } from './preduzece/auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminGuardService } from './services/guards/admin/admin.service';
import { PoljoprivrednikGuardService } from './services/guards/poljoprivrednik/poljoprivrednik.service';
import { PreduzeceGuardService } from './services/guards/preduzece/preduzece.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminService } from './services/admin/admin.service';
import { HttpService } from './services/http/http.service';
import { NgHcaptchaModule } from 'ng-hcaptcha';

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
    RegisterPreduzetnikComponent,
    NotFoundComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
