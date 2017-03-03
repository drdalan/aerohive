import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MycustomService } from '../../service/mycustom.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean;
  form: any;
  alert: boolean;
 
  constructor(public router: Router, public service: MycustomService,fb: FormBuilder ) { 
  this.alert = false;
      
    this.form = fb.group({
      'userName': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() {
  }

 submitForm(value: any){

console.log(this.form.value);
  
this.service.login(this.form.value).subscribe(

            data => {

            console.log(data)


    if(data.status==true){
    this.router.navigate(['/dashboard']);
   }
   else{
    //  this.alert = true;
     alert(data.message);
   }

            // alert(data.message);

            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );
 }


}
