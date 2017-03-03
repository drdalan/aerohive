import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MycustomService } from '../../service/mycustom.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
userSave: any;
list: any;
deleteUser: any;
update: any;
userName: any;
fullName: any;
password: any;
memberid: any;
constructor(public fb: FormBuilder, public customservice: MycustomService) { 


this.customservice.getUsers().subscribe(

            data => {
                 

         this.list = data;
        
      console.log(this.list);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );



 var emailRegex = "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$";
  
      
    this.userSave = fb.group({
      'userName': ['', [Validators.required]],
      'fullName': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      
    })

      this.update = fb.group({
      'userName': ['', [Validators.required]],
      'fullName': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      
    })


  }

  ngOnInit() {
  }


delete(id){
console.log(id);

this.customservice.deleteData(id).subscribe(

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

edit(item){

  this.userName = item.userName;
  this.fullName = item.fullName;
  this.password = item.password;
  this.memberid = item._id; 
  
  console.log(this.memberid);


}


update1(){

console.log(this.update.value);
this.customservice.update(this.update.value, this.memberid).subscribe(

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

 submitForm(){
  //  console.log(this.userSave.value);


   this.customservice.saveData1(this.userSave.value).subscribe(

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
