import { Component, OnInit } from '@angular/core';
import { MycustomService } from '../../service/mycustom.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  locationData: any;
  folders: any;
  floor: any;
  uniqueName: any;
  transporttype: string ="Location";

 public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['', '', "", ""];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [, , , ], label: ''},
    {data: [, , , ], label: ''},
    {data: [, , , ], label: ''}
  ];


updateWorkout(event){



// console.log(event);
// console.log(this.uniqueName);





this.barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };


 this.customservice.monitorListing().subscribe(

            data => {
                 
                //  if()
                //  console.log(data.data[0].macAddress);
                //   console.log(data.data[0].locations[3]);
                event = "Floor";

              if(data.data[0].locations[3]==event){

                this.customservice.clientTimeAPi(data.data[0].macAddress).subscribe(

            data => {
                 

            console.log(data.data);
       
  

            
        



            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );
                
              }

              console.log(event);

                

              // console.log(data.data[0].locations[3]);


            // console.log(data.data);
          // this.barChartLabels = [];
          // for (var index = 0; index < data.data.length; index++) {
          //   // console.log(data.data[index].hostName);

          //   // if(data.data[0].locations[3]==event){
          //   //  console.log(data.data.macAddress);
          //   // }
          //   this.barChartLabels.push(data.data[index].hostName);
            

            
          // }


          

            
        



            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );

this.customservice.monitorListing().subscribe(

            data => {
                 

            // console.log(data.data);
      
          this.barChartLabels = [];
          for (var index = 0; index < data.data.length; index++) {
        
            this.barChartLabels.push(data.data[index].hostName);
            

               }
  

            
        



            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );





  this.barChartType = 'bar';
  this.barChartLegend= true;
 
  this.barChartData = [
    {data: [10, 20, 8 ], label: 'uniqueClients'},
    {data: [39, 56, 7 ], label: 'associatedClients,'},
    {data: [49, 50, 10], label: 'engagedClients'},
  ];










}






  constructor(public customservice: MycustomService){

  
  this.customservice.locationAPi().subscribe(

            data => {
                 

         this.locationData = data.data;
        this.folders = this.locationData.folders;
        // console.log(this.folders);
        this.floor = this.folders[0].folders[0].folders[0].folderType;
        this.uniqueName = this.folders[0].folders[0].folders[0].uniqueName;

    
         

        //  console.log(this.locationData.folders[0].folderType);
         
        //   console.log(this.locationData[0].deviceId);
        //   console.log(this.locationData[0].macAddress);
        //  console.log(this.locationData[0].locations[3]);
        



            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );


  }
 







  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }


ngOnInit() {



  }

}
