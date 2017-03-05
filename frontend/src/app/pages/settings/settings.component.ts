import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MycustomService } from '../../service/mycustom.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
settingsSave: any;
id1: any;
list: any;
list2: any;
ownerid: any;
auth: any;
redirect: any;
clientid: any;
secret: any;
memberid: any;

constructor(public fb: FormBuilder, public customservice: MycustomService) { 

this.customservice.getSettings().subscribe(

            data => {
                 

         this.list = data;
         this.list2 = data[0];

         this.id1 = data[0]._id;
        
       console.log(this.list);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );

 var emailRegex = "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$";
  
      
    this.settingsSave = fb.group({
      'ownerid': ['', [Validators.required, Validators.minLength(4)]],
      'auth': ['', [Validators.required]],
      'redirect': ['', [Validators.required]],
      'clientid': ['', [Validators.required]],
      'secret': ['', [Validators.required]],
            
    })
    

  }

  Upgrade(){
  
    this.customservice.getUpgrade().subscribe(

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

settingsUpdate1(){

console.log(this.settingsSave.value);
this.customservice.settingsUpdate(this.settingsSave.value, this.id1).subscribe(

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
