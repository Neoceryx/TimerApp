import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  CurrentDate:any = "";

  ngOnInit(): void {
    this.GetCurrentdate();
  }

  async GetCurrentdate(){ 
    
    setInterval(()=>{
      this.CurrentDate = new Date();
    },1000)
    
  }
  // End function

}
