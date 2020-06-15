import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { StorageService } from './services/storage/storage.service';
import { GuestService } from './services/guest/guest.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PreduzeceComponent,
    PoljoprivrednikComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AuthService, AuthGuardService, StorageService, GuestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
