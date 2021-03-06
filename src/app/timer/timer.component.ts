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

  parentExample:string="Time's up";

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
  TotalSecondsRemaining:number = 0;

  ngOnInit(): void {
    this.InitializeEditFormValues();
    this.InitializeDektopNotifications();
  }

  async StartTimer() {
    // Get Values from AutoComplete Controls Or Resume the lasted value when pause was pressed
    this.Hours = this.GetValueAutoCompleted(this.HoursControl[0].selectize.getValue());
    this.Minutes = this.GetValueAutoCompleted(this.MinutesControl[0].selectize.getValue());
    this.Seconds = this.GetValueAutoCompleted(this.SecondsControl[0].selectize.getValue());
    
    // Validate Values in the Timer
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

    this.HoursControl[0].selectize.setValue(0);
    this.MinutesControl[0].selectize.setValue(0);
    this.SecondsControl[0].selectize.setValue(0);

    this.Sound.pause();

    this.IsRunning = false;
    this.IsEditEnabled = false;
  }
  // end function

  async StartDecrement() {

    // Parse all values to seconds
    var HoursToSec = this.Hours * 3600;
    var MinToSec = this.Minutes * 60;
    var TotalSec = 0;

    if (this.Hours == 0 && this.Minutes == 59 && this.Seconds == 59) {
      TotalSec = HoursToSec + MinToSec + 58;
    } else {
      TotalSec = HoursToSec + MinToSec + this.Seconds;
    }

    this.TotalSecondsRemaining = TotalSec - 1;
    var SecToHours = this.TotalSecondsRemaining / 3600;
    var MinToSec = (SecToHours % 1) * 60;
    var SecondsRemaining = (MinToSec % 1) * 60;

    var min = MinToSec.toString().split('.');
    var hours = SecToHours.toString().split('.');

    this.Hours = parseInt(hours[0]);
    this.Minutes = parseInt(min[0]);
    this.Seconds = Math.round(SecondsRemaining);

    if (this.TotalSecondsRemaining <= 0) {
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
      // End Notification

      // show notification here
      var notify = new Notification('Hi there!', {
        body:"Timer has been reaches time specyfied",
        icon: 'https://bit.ly/2DYqRrh',
      });

    }
    // End if

  }
  // End function

  async PauseTimer() {

    this.IsRunning = false;

    this.HoursControl[0].selectize.setValue(this.Hours);
    this.MinutesControl[0].selectize.setValue(this.Minutes);
    this.SecondsControl[0].selectize.setValue(this.Seconds);

    clearInterval(this.Timer);
  }
  // End function

  async EnableEditTimer() {
    this.IsEditEnabled = this.IsEditEnabled == false ? true : false;
  }
  // End function

  async InitializeEditFormValues() {
    
    // Fill Arrays for the UI Controls
    for (let index = 0; index < 25; index++) {
      this.HoursAvailables.push({'id': index});
    }

    for (let index = 0; index < 60; index++) {
      this.MinutesAndSecondsArray.push({'id': index});
    }

    // Standar for Timer Control(Hours, mininutes and Seconds)
    var HoursControlOptions = {
      create: false,
      valueField: 'id',
      labelField: 'id',
      searchField: 'id',
      options: this.HoursAvailables,
    };

    var MinAndSecondsControlOptions = {
      create: false,
      valueField: 'id',
      labelField: 'id',
      searchField: 'id',
      options: this.MinutesAndSecondsArray,
    };

    // Initialize UI Controls
    this.HoursControl = $('#js_HoursAutocomplete').selectize(HoursControlOptions);
    this.MinutesControl = $("#js_MinAutocomplete").selectize(MinAndSecondsControlOptions);
    this.SecondsControl = $("#js_SecondsAutocomplete").selectize(MinAndSecondsControlOptions)

    // Auto Select the value 0 in all Timer control
    this.HoursControl[0].selectize.setValue(0);
    this.MinutesControl[0].selectize.setValue(0);
    this.SecondsControl[0].selectize.setValue(0);

  }
  // End function

  GetValueAutoCompleted(ValToCompare:any):number {
    var data =  ValToCompare !== "" ? ValToCompare : 0    
    return parseInt(data);
  }
  // End function


  async InitializeDektopNotifications(){
    
    // Validate if browser supports Desktop Notifications
    if (!window.Notification) {
      
      Swal.fire({
        title: 'Upps!',
        text: 'Browser does not support notifications.',
        icon: 'error',
        allowOutsideClick: false,
      });

    } else {
      // Check if permisson is garanted
      if (Notification.permission !== 'granted') {
        // request permission from user
        Notification.requestPermission().then(function (p) {
            if (p === 'granted') {

              // show notification here
              var notify = new Notification('Hi there!',{
                body:"You will receive  notifications when timer has been reached time specified",
                icon:"https://bit.ly/2DYqRrh"
              });

            } else {
              console.log('User blocked notifications.');
            }
          }).catch(function (err) {
            console.error(err);
          });
      } else {
      }
    }
    // End Desktop notification support verification

  }
  // End function

}
