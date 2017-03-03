import { Component, OnInit } from '@angular/core';
import { MycustomService } from '../../service/mycustom.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  list: any;

  constructor(public customservice: MycustomService ) { 
 
}

  ngOnInit() {

     this.customservice.clientTable().subscribe(

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
