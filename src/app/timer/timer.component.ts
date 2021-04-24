import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  constructor() {}

  Hours: number = 0;
  Minutes: number = 0;
  Seconds: number = 0;

  Timer: any = null;
  Sound = new Audio('/assets/sounds/alarm-clock.mp3');
  IsRunning: boolean = false;
  IsEditEnabled: boolean = false;

  HoursAvailables: any[] = [];
  MinutesAndSecondsArray: any[] = [];

  HoursControl: any = null;
  MinutesControl:any = null; 
  SecondsControl: any = null;

  ngOnInit(): void {
    this.InitializeEditFormValues();
  }

  async StartTimer() {
    debugger
    var HoursSelected = this.HoursControl[0].selectize.items[0];

    this.Hours = typeof HoursSelected !== "undefined" ? HoursSelected : 0;

    if (this.Hours == 0 && this.Minutes == 0 && this.Seconds == 0) {
      Swal.fire({
        title: 'Upps!',
        text: 'Please select a valid duration',
        icon: 'error',
        allowOutsideClick: false,
      });
    } else {

      this.IsRunning = true;
      this.IsEditEnabled = false;

      this.Timer = setInterval(() => {
        this.StartDecrement();
      }, 1000);
    }
  }
  // End function

  async StopTimer() {
    await this.PauseTimer();

    this.Hours = 0;
    this.Minutes = 0;
    this.Seconds = 0;

    this.Sound.pause();

    this.IsRunning = false;
    this.IsEditEnabled = false;
  }
  // end function

  async StartDecrement() {
    // To fix the valus got by string
    this.Hours = parseInt(this.Hours.toString());
    this.Minutes = parseInt(this.Minutes.toString());
    this.Seconds = parseInt(this.Seconds.toString());

    var HoursToSec = this.Hours * 3600;
    var MinToSec = this.Minutes * 60;
    var TotalSec = 0;

    if (this.Hours == 0 && this.Minutes == 59 && this.Seconds == 59) {
      TotalSec = HoursToSec + MinToSec + 58;
    } else {
      TotalSec = HoursToSec + MinToSec + this.Seconds;
    }

    var TotalSecondsRemaining = TotalSec - 1;
    var SecToHours = TotalSecondsRemaining / 3600;
    var MinToSec = (SecToHours % 1) * 60;
    var SecondsRemaining = (MinToSec % 1) * 60;

    var min = MinToSec.toString().split('.');
    var hours = SecToHours.toString().split('.');

    this.Hours = parseInt(hours[0]);
    this.Minutes = parseInt(min[0]);
    this.Seconds = Math.round(SecondsRemaining);

    if (TotalSecondsRemaining <= 0) {
      await this.StopTimer();
      this.Sound.play();

      Swal.fire({
        title: "Time's up",
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((results) => {
        // If press ok
        if (results.isConfirmed) {
          this.StopTimer();
        }
      });
    }
  }
  // End function

  async PauseTimer() {
    this.IsRunning = false;
    clearInterval(this.Timer);
  }
  // End function

  async EnableEditTimer() {
    this.IsEditEnabled = this.IsEditEnabled == false ? true : false;
  }
  // End function

  InitializeEditFormValues() {

    for (let index = 0; index < 25; index++) {
      this.HoursAvailables.push({'id': index});
    }

    for (let index = 0; index < 60; index++) {
      this.MinutesAndSecondsArray.push({'id': index});
    }

    var ControlOptions = {
      create: true,
      valueField: 'id',
      labelField: 'id',
      searchField: 'id',
      options: this.HoursAvailables,
    };

    this.HoursControl = $('#js_HoursAutocomplete').selectize(ControlOptions);
    this.MinutesControl = $("#js_MinAutocomplete").selectize(ControlOptions);

  }
  // End function
}
