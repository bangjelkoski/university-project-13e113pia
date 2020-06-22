import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poljoprivrednik-rasadnici',
  templateUrl: './rasadnici.component.html',
  styleUrls: ['./rasadnici.component.scss'],
})
export class RasadniciComponent implements OnInit {
  @Input() rasadnici = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onMagacin(rasadnik) {
    this.router.navigate([`/poljoprivrednik/rasadnik/${rasadnik.id}/magacin`]);
  }

  onDetails(rasadnik) {
    this.router.navigate([`/poljoprivrednik/rasadnik/${rasadnik.id}`]);
  }
}
