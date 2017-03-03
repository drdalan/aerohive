import { Component } from '@angular/core';
import { MycustomService } from './service/mycustom.service';
import 'rxjs/Rx'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(public service: MycustomService){
     
  }
}
