import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {StopWatchComponent } from "./stop-watch/stop-watch.component";
import { NavbarComponent } from './navbar/navbar.component';
import { TimerComponent } from './timer/timer.component';
import { FormsModule } from '@angular/forms';
import { DesktopNotificationComponent } from './desktop-notification/desktop-notification.component'; 


@NgModule({
  declarations: [
    AppComponent,
    StopWatchComponent,
    NavbarComponent,
    TimerComponent,
    DesktopNotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
