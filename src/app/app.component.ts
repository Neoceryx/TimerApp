import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title:string = 'TimerApp';

  number:any ="";
  output:any;
  webworker:Worker = new Worker("");

  ngOnInit() {
    if(typeof Worker !== 'undefined') {

        this.webworker = new Worker('./webworker.worker', { type: 'module' })
            
        this.webworker.onmessage = (data)=>{
          this.output = data.data;
        }

    }
}
  
  calcFib() { 
    
    setInterval(()=> {      
      this.webworker.postMessage(this.number)
    },1000)
    
   }
  
}

