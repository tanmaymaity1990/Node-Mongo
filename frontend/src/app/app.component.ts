import { Component } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  currentRoute: string = '';
  event$ 

  constructor(private router:Router){
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                this.currentRoute = event.url;
              }
            });
  }

}
