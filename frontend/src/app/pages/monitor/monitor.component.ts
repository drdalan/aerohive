import { Component, OnInit } from '@angular/core';
import { MycustomService } from '../../service/mycustom.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  list: any;

  constructor(public customservice: MycustomService ) { 
 
}

  ngOnInit() {

     this.customservice.monitorListing().subscribe(

            data => {
                 

         this.list = data.data;
         console.log(this.list);
        



            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );
  }

}
