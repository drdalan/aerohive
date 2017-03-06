import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MycustomService } from '../../service/mycustom.service';

@Component({
  selector: 'app-emailsettings',
  templateUrl: './emailsettings.component.html',
  styleUrls: ['./emailsettings.component.css']
})
export class EmailsettingsComponent implements OnInit {

memberid: any;
emailsettingsSave: any;
id1: any;
id2: any;
list: any;
list2: any;
smtpHostname: any;
userName: any;
password: any;
toAddr: any;
fromAddr: any;
subject: any;
smtpPort: any;

constructor(public fb: FormBuilder, public customservice: MycustomService) { 

this.customservice.getemailSettings().subscribe(

            data => {
                 

         this.list = data;
         this.list2 = data[0];

         this.id2 = data[0]._id;

        
       console.log(this.list);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );


 var emailRegex = "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$";
 var hostnameRegex = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$";
 var portnumberRegex = "^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])";
      
    this.emailsettingsSave = fb.group({

      'smtpHostname': ['', [Validators.required, Validators.pattern(hostnameRegex)]],
      'userName': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'toAddr': ['', [Validators.required, Validators.pattern(emailRegex)]],
      'fromAddr': ['', [Validators.required, Validators.pattern(emailRegex)]],
      'subject': ['', [Validators.required]],
      'smtpPort': ['', [Validators.required, Validators.minLength(2), Validators.pattern(portnumberRegex)]],

    })
    
  }

  Alerts(){
  
    this.customservice.getAlerts().subscribe(

                  data => {

          console.log(data);

            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
    );
  }
  
  Edit(id){
   this.id1 = id;
  }

  ngOnInit() {
  }

emailsettingsUpdate1(){

console.log(this.emailsettingsSave.value);
this.customservice.emailsettingsUpdate(this.emailsettingsSave.value, this.id1).subscribe(

            data => {
                 

            console.log(data)

            alert(data.message);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );



}

}
