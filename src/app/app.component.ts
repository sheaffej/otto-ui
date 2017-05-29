import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <rules-list></rules-list>
  `,
})
export class AppComponent  { 
  title = 'Ottomation UI'; 
}
