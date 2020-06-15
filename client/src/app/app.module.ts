import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { StorageService } from './services/storage/storage.service';
import { GuestService } from './services/guest/guest.service';
import { LogoComponent } from './components/partials/logo/logo.component';
import { DemoService } from './services/demo/demo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { PasswordComponent } from './auth/password/password.component';
import { RegisterComponent as RegisterPoljoprivrednikComponent } from './poljoprivrednik/auth/register/register.component';
import { RegisterComponent as RegisterPreduzetnikComponent } from './preduzece/auth/register/register.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    AuthService,
    AuthGuardService,
    StorageService,
    GuestService,
    DemoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
