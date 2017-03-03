import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MycustomService } from '../../service/mycustom.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  form: any;

  list: any;

  constructor(fb: FormBuilder,public customservice: MycustomService) {

    this.form = fb.group({

       'msg': ['',],
       'deviceId':['', Validators.required],
       'host': ['', Validators.required],
       'toaddr': ['', Validators.required],
       'fromaddr': ['', Validators.required],
       'sub': ['', Validators.required],
       'username': ['', Validators.required],
       'port': ['', Validators.required],
       'password': ['', Validators.required],
    })

   }

  ngOnInit() {
  }

  sendMail(){

this.customservice.monitorListing().subscribe(

            data => {
                 

         this.list = data.data;

        for (var index = 0; index <this.list.length; index++) {

              if(this.list[index].deviceId == this.form.value.deviceId){
                  if(this.list[index].connected==true){

             this.customservice.sendMail(this.form.value,"true").subscribe(

            data => {
                 

                console.log(data);

                alert(data.message);

            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );


                  }
                  else if(this.list[index].connected==false){
   
         this.customservice.sendMail(this.form.value,"false").subscribe(

            data => {
                 

          console.log(data);

          alert(data.message);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );         

                  }
              }        

            //  console.log(this.list[index].connected);  
          
        }

        // console.log(this.list);
        
            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );

  }

}
