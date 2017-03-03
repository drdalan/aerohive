import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MycustomService } from '../../service/mycustom.service';

@Component({
  selector: 'app-networksettings',
  templateUrl: './networksettings.component.html',
  styleUrls: ['./networksettings.component.css']
})
export class NetworksettingsComponent implements OnInit {
networksettingsSave: any;
networksettingsSavedhcp: any;
list: any;
ipaddr: any;
subnet: any;
gateway: any;
dns1: any;
dns2: any;
hostname: any;
memberid: any;
dhcp: any;
id1: any;
ip: any;

constructor(public fb: FormBuilder, public customservice: MycustomService) { 

this.customservice.getNetworksettings().subscribe(

            data => {
                 

         this.list = data[0];

         this.id1 = data[0]._id;

        
       console.log(this.list);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );

 var emailRegex = "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$";
 var hostnameRegex = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$";
 var ipaddressRegex ="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
 var subnetRegex = "^((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254)))))$";  
      
    this.networksettingsSave = fb.group({
      'ipaddr': ['', [Validators.required, Validators.pattern(ipaddressRegex)]],
      'subnet': ['', [Validators.required, Validators.pattern(subnetRegex)]],
      'gateway': ['', [Validators.required, Validators.pattern(ipaddressRegex)]],
      'dns1': ['', [Validators.required, Validators.pattern(ipaddressRegex)]],
      'dns2': ['', [Validators.required, Validators.pattern(ipaddressRegex)]],
      'hostname': ['', [Validators.required, Validators.pattern(hostnameRegex)]],
    })

   
    this.networksettingsSavedhcp = fb.group({
      'ipaddr': 'dhcp',
      'subnet': 'dhcp',
      'gateway': 'dhcp',
      'dns1': 'dhcp',
      'dns2': 'dhcp',
      'hostname': ['', [Validators.required]],
    })
        

  }

 

  ngOnInit() {
  }

networksettingsUpdate(){

console.log(this.networksettingsSave.value);
this.customservice.networksettingsUpdate(this.networksettingsSave.value, this.id1).subscribe(

            data => {
                 

            console.log(data)

            
              if(data.status==true){
             
               alert(data.message);
               this.customservice.getNetworkupdate().subscribe(

                  data => {
                 

          console.log(data);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );
 



                 


              } else{
                alert(data.message);      
              }

            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );


}

networksettingsUpdatedhcp(){

console.log(this.networksettingsSavedhcp.value);
this.customservice.networksettingsUpdatedhcp(this.networksettingsSavedhcp.value, this.id1).subscribe(

            data => {
                 

            console.log(data)

            
              if(data.status==true){
             
               alert(data.message);
               this.customservice.getNetworkupdate().subscribe(

                  data => {
                 

          console.log(data);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );
 



                 


              } else{
                alert(data.message);      
              }

            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );


}


}
