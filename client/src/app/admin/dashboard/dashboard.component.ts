import { Component } from '@angular/core';
import { ViewService } from 'src/app/services/view/view.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private viewService: ViewService) {
    this.viewService.setTitle('Почетна');
  }
}
