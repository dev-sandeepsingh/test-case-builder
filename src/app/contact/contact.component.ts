import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  // templateUrl: './contact.component.html',
  template: `
    <input #box (keyup.enter)="onEnter(box.value)">
    <p>{{value}}</p>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  value = '';
  onEnter(value: string) { this.value = value; }
  

  constructor() { }

  ngOnInit() {
  }

}
