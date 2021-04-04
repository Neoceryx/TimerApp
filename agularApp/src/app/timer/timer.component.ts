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
  Seconds:number = 5;

  Timer:any = null;
  Sound = new Audio("/assets/sounds/alarm-clock.mp3");
  IsRunning:boolean = false;

  ngOnInit(): void {
  }

  async StartTimer(){

    this.IsRunning = true;

     this.Timer = setInterval(() => {
       this.StartDecrement();
    }, 1000);

  }
  

  async StopTimer(){

    await this.PauseTimer();

   this.Hours = 0;
   this.Minutes = 0;
   this.Seconds = 0;

   this.Sound.pause();

   this.IsRunning = false;

  }

  async StartDecrement(){

    this.Seconds--;

    if (this.Seconds <= 0) {
      
      await this.StopTimer();
      this.Sound.play();

    }


  }
  // End function
  
  async PauseTimer(){
    this.IsRunning = false;
    clearInterval(this.Timer);
  }


}
