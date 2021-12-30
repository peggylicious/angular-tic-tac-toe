import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
  <button nbButton *ngIf="!value"> {{value}}</button>
  <button nbButton hero status="success" *ngIf="value == 'X'">{{value}}</button>
  <button nbButton hero status="info" *ngIf="value == 'O'">{{value}}</button>

  `,
  styles: [
    'button { width: 100%; height: 100%; font-size: 5em !important; }'
  ]
})
export class SquareComponent {
  rando = Math.random()
  player = '';
  @Input() value: string  = '';
  constructor() {}

  ngOnInit(): void {
    // if(this.value == true){
    //   this.player = 'X'
    // }else{
    //   this.player =  'O'
    // }
  }

}
