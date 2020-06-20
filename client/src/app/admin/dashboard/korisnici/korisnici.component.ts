import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Status, Role } from 'src/types';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.scss'],
})
export class KorisniciComponent {
  @Input() korisnici: Array<object>;
  @Output() odobren = new EventEmitter<boolean>();
  @Output() odbijen = new EventEmitter<boolean>();

  Status = Status;
  Role = Role;

  constructor(private adminService: AdminService) {}

  async odobri({ id }) {
    await this.adminService.odobri(id);
    this.odobren.emit(id);
  }

  async odbij({ id }) {
    await this.adminService.odbij(id);
    this.odbijen.emit(id);
  }
}
