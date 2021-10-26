import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ngOnInit() {
    sessionStorage.clear();
  }
 
}
