import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn();
  }
}
