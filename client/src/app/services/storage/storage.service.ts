declare var require: any;

import { Injectable } from '@angular/core';
const store = require('store2');

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage;

  constructor() {
    this.storage = store.namespace('pia');
  }

  get(key: string, defaultValue: any = {}): any {
    return this.storage.get(key) || defaultValue;
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  set(key: string, value: any): void {
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.remove(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
