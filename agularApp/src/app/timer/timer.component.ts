import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }

  Hours:number = 0;
  Minutes:number = 0;
  Seconds:number = 0;

  Timer:any = null;
  Sound = new Audio("/assets/sounds/alarm-clock.mp3");
  IsRunning:boolean = false;
  IsEditEnabled:boolean = false;

  HoursAvailables: number[] = [];
  MinutesAndSecondsArray: number[] =[];

  ngOnInit(): void {
    this.InitializeEditFormValues();
  }

  async StartTimer(){

    if (this.Hours == 0 && this.Minutes == 0 && this.Seconds == 0) {
      alert("Please select valid duration");
    }else{      

      this.IsRunning = true;       
      await this.EnableEditTimer();

      this.Timer = setInterval(() => {
        this.StartDecrement();
      }, 1000);

    }

  }
  // End function

  async StopTimer(){

    await this.PauseTimer();    

    this.Hours = 0;
    this.Minutes = 0;
    this.Seconds = 0;

    this.Sound.pause();

    this.IsRunning = false;
    this.IsEditEnabled = false;

  }
  // end function

  async StartDecrement(){

    var HoursToSec = this.Hours * 3600;
    var MinToSec = this.Minutes * 60;
    var TotalSec = 0;
    debugger
    if (this.Hours == 0 && this.Minutes == 59  && this.Seconds == 59) {
      TotalSec = HoursToSec + MinToSec;
    }else{
      TotalSec = HoursToSec + MinToSec + this.Seconds;
    }
    
    var TotalSecondsRemaining = TotalSec - 1;    
    var SecToHours = TotalSecondsRemaining / 3600 ;
    var MinToSec = (SecToHours % 1) * 60;
    var SecondsRemaining = (MinToSec % 1) * 60

    var min = MinToSec.toString().split(".");
    var hours = SecToHours.toString().split(".")

    this.Hours = parseInt(hours[0]);
    this.Minutes = parseInt(min[0]);
    this.Seconds = Math.round(SecondsRemaining);
    
    if (TotalSecondsRemaining <= 0) {
     
      await this.StopTimer();
      this.Sound.play();
      console.log("Time's up");

    }

  }
  // End function
  
  async PauseTimer(){
    this.IsRunning = false;
    clearInterval(this.Timer);
  }
  // End function

  async EnableEditTimer() {

    this.IsEditEnabled = this.IsEditEnabled == false ? true :false;

  }
  // End function

  InitializeEditFormValues(){

    for (let index = 0; index < 25; index++) {
      this.HoursAvailables.push(index);            
    }

    for (let index = 0; index < 60; index++) {
      this.MinutesAndSecondsArray.push(index);
    }

  }
  // End function


}
