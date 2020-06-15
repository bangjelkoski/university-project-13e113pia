import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
})
export class LogoComponent implements OnInit {
  @Input() size: string = 'md';

  classes: string;

  ngOnInit() {
    this.calculateClasses();
  }

  calculateClasses() {
    const classes = ['w-auto'];

    if (this.size === 'sm') {
      classes.push('h-8');
    } else if (this.size === 'md') {
      classes.push('h-12');
    } else if (this.size === 'lg') {
      classes.push('h-16');
    }

    this.classes = classes.join(' ');
  }
}
