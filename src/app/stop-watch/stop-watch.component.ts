import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.css']
})
export class StopWatchComponent implements OnInit {

  constructor() { }

  timer:any;

  seconds:number = 0;
  minutes:number = 0;
  hours:number = 0;

  IsRunning:boolean = false;
  HideIntervalBTN:boolean = true;
  IntervalsSaved:any = [];

  ngOnInit(): void {
  }
  
  async StartTimer() {

    this.HideIntervalBTN = false

    if (this.IsRunning == false) {
      this.IncrementSeconds();      
    }else{
      console.log("StopWatch is running");
    }     

  };
  // end function

  async StopTimer (){

    await this.PauseTimer();

    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;

    this.HideIntervalBTN = true;
    this.IntervalsSaved = [];

  };
  // end function

  async PauseTimer(){
    
    this.IsRunning = false;

    clearInterval(this.timer) 
  };
  // end function

  async IncrementSeconds(){

    this.IsRunning = true;

    this.timer = setInterval(()=> {
      
      if (this.seconds == 59) {
        this.minutes ++;
        this.seconds = 0;       
      }else{
        this.seconds ++;
      }

      if (this.minutes == 59) {
        this.hours ++;
        this.minutes = 0;
      }
            
     },1000);

  };
  // end function

  async SaveInterval(){
    this.IntervalsSaved.push(this.hours +":" + this.minutes + ":" + this.seconds )
    console.log(this.IntervalsSaved)  
  };
  // end function

}
