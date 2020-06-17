import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  private title: string = '';

  constructor() {}

  setTitle(title: string): void {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }
}
