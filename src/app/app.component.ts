import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'health_risk_status';
  ngOnInit() {
    if(!sessionStorage.hasOwnProperty('isUserLoggedIn')){
      console.log("has property");
      sessionStorage.setItem('isUserLoggedIn','false');
    }
  }
}
