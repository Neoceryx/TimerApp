import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desktop-notification',
  templateUrl: './desktop-notification.component.html',
  styleUrls: ['./desktop-notification.component.css']
})
export class DesktopNotificationComponent implements OnInit {

  // https://angular.io/guide/component-interaction

  Sound = new Audio('/assets/sounds/alarm-clock.mp3');

  @Input ()
  get TotalSecondsRemaining():number {return this._totalSec}
  set TotalSecondsRemaining(TotalSecondsRemaining:number){
    

    if (TotalSecondsRemaining == 0) {
      alert(0)
      this.Sound.play();

    }

    this._totalSec = TotalSecondsRemaining

  }

  private _totalSec = 0

  constructor() { }

  ngOnInit(): void {

  }  



}
