import { Injectable } from '@angular/core';
import {Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MycustomService {
   c_secret: string;
   c_id: string;
   c_url: string;
   auth: string;
   c_control: string;
   p_token: string;

   //Send Mail

   host: any;
   toaddr: any;
   fromaddr: any;
   sub: any;
   user: any;
   pass: any;
   port: any;
   msg: any;
   list: any;

   //API details

   ownerid: any;
   auth1: any;
   redirect: any;
   clientid: any;
   secret: any;

   smtpHostname: any;
   euserName: any;
   password: any;
   toAddr: any;
   fromAddr: any;
   subject: any;
   smtpPort: any;

    constructor(public http: Http) {

     
     var url="http://api.dalan.pro/setting";
        
        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'GET');
       
        this.http.get(url).map(
            res=> res.json()

        ).subscribe(

            data => {
                 

         this.list = data[0];
         this.ownerid = data[0].ownerid;
         this.auth1 = data[0].auth;
         this.redirect = data[0].redirect;
         this.clientid = data[0].clientid;
         this.secret = data[0].secret;

        
       console.log(this.ownerid+this.auth1+this.redirect+this.clientid+this.secret);


            },
            error => {

                console.log(JSON.stringify(error));

            },
            () => console.log('Finished')
        );
     
    }

monitorListing(){
          
    var mintorApi = "https://cloud-va.aerohive.com/xapi/v1/monitor/devices?ownerId="+this.ownerid;
     this.c_secret = this.secret;
     this.c_id = this.clientid;
     this.c_url = this.redirect;
     this.auth = this.auth1;
     this.c_control = "no-cache";

      var headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
     headers.append('X-AH-API-CLIENT-SECRET', this.c_secret);
     headers.append('X-AH-API-CLIENT-ID', this.c_id);
     headers.append('X-AH-API-CLIENT-REDIRECT-URI', this.c_url);
     headers.append('Authorization', this.auth);
     headers.append('Cache-Control', this.c_control);
      
 let options = new RequestOptions({
          method: RequestMethod.Get,
          url: mintorApi,
          headers: headers
      });
      
      return this.http.request(new Request(options))
      .map(res => res.json())

    }

locationAPi(){
          
    var locationApi = " https://cloud-va.aerohive.com/xapi/v1/configuration/apLocationFolders?ownerId="+this.ownerid;
     this.c_secret = this.secret;
     this.c_id = this.clientid;
     this.c_url = this.redirect;
     this.auth = this.auth1;
     this.c_control = "no-cache";

      var headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
     headers.append('X-AH-API-CLIENT-SECRET', this.c_secret);
     headers.append('X-AH-API-CLIENT-ID', this.c_id);
     headers.append('X-AH-API-CLIENT-REDIRECT-URI', this.c_url);
     headers.append('Authorization', this.auth);
     headers.append('Cache-Control', this.c_control);
      
 let options = new RequestOptions({
          method: RequestMethod.Get,
          url: locationApi,
          headers: headers
      });
        
      return this.http.request(new Request(options))
      .map(res => res.json())

    }



clientTimeAPi(mac){
  var mac = mac;
          
    var clientTimeApi = " https://cloud-va.aerohive.com/xapi/v1/clientlocation/clienttimeseries?ownerId="+this.ownerid+"&timeUnit=FiveMinutes&apmac=" + mac + "&startTime=2016-12-14T01:00:00.000Z&endTime=2016-12-14T23:00:00.000Z";
     this.c_secret = this.secret;
     this.c_id = this.clientid;
     this.c_url = this.redirect;
     this.auth = this.auth1;
     this.c_control = "no-cache";

      var headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
     headers.append('X-AH-API-CLIENT-SECRET', this.c_secret);
     headers.append('X-AH-API-CLIENT-ID', this.c_id);
     headers.append('X-AH-API-CLIENT-REDIRECT-URI', this.c_url);
     headers.append('Authorization', this.auth);
     headers.append('Cache-Control', this.c_control);
      
 let options = new RequestOptions({
          method: RequestMethod.Get,
          url: clientTimeApi,
          headers: headers
      });
    
      return this.http.request(new Request(options))
      .map(res => res.json())

    }


// clientTable(){
          
//     // var clientTable = " https://cloud-va.aerohive.com/xapi/v1/monitor/clients?ownerId="+this.ownerid;
//     // var clientTable = "https://cloud-va.aerohive.com/xapi/v1/monitor/clients?ownerId="+this.ownerid+"&startTime="+f.sdate+"T01:00:00.000Z&endTime="+f.edate+"T23:00:00.000Z&page=0&pageSize=500"
//     var clientTimeApi = "https://cloud-va.aerohive.com/xapi/v1/monitor/clients?ownerId=1239&startTime=2017-01-01T01:00:00.000Z&endTime=2017-02-28T23:00:00.000Z&page=0&pageSize=500"
//      this.c_secret = this.secret;
//      this.c_id = this.clientid;
//      this.c_url = this.redirect;
//      this.auth = this.auth1;
//      this.c_control = "no-cache";

//       var headers = new Headers();
//     //  headers.append('Content-Type', 'application/json');
//      headers.append('X-AH-API-CLIENT-SECRET', this.c_secret);
//      headers.append('X-AH-API-CLIENT-ID', this.c_id);
//      headers.append('X-AH-API-CLIENT-REDIRECT-URI', this.c_url);
//      headers.append('Authorization', this.auth);
//      headers.append('Cache-Control', this.c_control);
      
//  let options = new RequestOptions({
//           method: RequestMethod.Get,
//           url: clientTable,
//           headers: headers
//       });

//       return this.http.request(new Request(options))
//       .map(res => res.json())

//     }

clientTable(){

    var clientTable = "https://cloud-va.aerohive.com/xapi/v1/monitor/clients?ownerId=1239&startTime=2017-02-20T01:00:00.000Z&endTime=2017-02-28T23:00:00.000Z&page=0&pageSize=500"
     this.c_secret = this.secret;
     this.c_id = this.clientid;
     this.c_url = this.redirect;
     this.auth = this.auth1;
     this.c_control = "no-cache";
        

      var headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
     headers.append('X-AH-API-CLIENT-SECRET', this.c_secret);
     headers.append('X-AH-API-CLIENT-ID', this.c_id);
     headers.append('X-AH-API-CLIENT-REDIRECT-URI', this.c_url);
     headers.append('Authorization', this.auth);
     headers.append('Cache-Control', this.c_control);

      
 let options = new RequestOptions({
          method: RequestMethod.Get,
          url: clientTable,
          headers: headers
      });
        

        
  
      
      return this.http.request(new Request(options))
      .map(res => res.json())

    }




sendMail(f, res1){
           
     this.host = f.host;
     this.toaddr = f.toaddr;
     this.fromaddr = f.fromaddr;
     this.sub = f.sub;
     this.user = f.username;
     this.port = f.port;
     this.msg = f.msg;
     this.pass = f.password;

     var url="http://api.dalan.pro/mail";

        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'POST');

     let body={
      host: this.host,
      toaddr: this.toaddr,
      fromaddr: this.fromaddr,
      sub: this.sub,
      username: this.user,
      port: this.port,
      msg: this.msg +" "+ res1,
      password: this.pass
    }

    console.log(body);
       
        return this.http.post(url ,body).map(
            res => res.json()
        )
     
    }

getUsers(){
     
     var url="http://api.dalan.pro/insertData";
        
        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'GET');
       
        return this.http.get(url).map(
            res => res.json()
        )
     
    }

getemailSettings(){
     
     var url="http://api.dalan.pro/emailsetting";
        
        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'GET');
       
        return this.http.get(url).map(
            res => res.json()
        )
     
    }

emailsettingsUpdate(f,id){

     var url="http://api.dalan.pro/emailsetting/update/"+id;
        
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");     

    let body={

    smtpHostname:f.smtpHostname,
    userName:f.euserName,
    password:f.password,
    toAddr:f.toAddr,
    fromAddr:f.fromAddr,
    subject:f.subject,
    smtpPort:f.smtpPort
    
    };

    console.log(body);

        return this.http.post(url ,body).map(
            res => res.json()
        )
     
    }

getSettings(){
     
     var url="http://api.dalan.pro/setting";
        
        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'GET');
       
        return this.http.get(url).map(
            res => res.json()
        )
     
    }

settingsUpdate(f,id){

     var url="http://api.dalan.pro/setting/update/"+id;
        
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");     

    let body={
    ownerid:f.ownerid,
    auth:f.auth,
    redirect:f.redirect,
    clientid:f.clientid,
    secret:f.secret
    
    };

    console.log(body);

        return this.http.post(url ,body).map(
            res => res.json()
        )
     
    }

getNetworksettings(){
     
     var url="http://api.dalan.pro/networksetting";
        
        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'GET');
       
        return this.http.get(url).map(
            res => res.json()
        )
     
    }

networksettingsUpdate(f,id){



     var url="http://api.dalan.pro/networksetting/update/"+id;
        
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");     

    let body={
    ipaddr:f.ipaddr,
    subnet:f.subnet,
    gateway:f.gateway,
    dns1:f.dns1,
    dns2:f.dns2,
    hostname:f.hostname
    
    };

    console.log(body);

        return this.http.post(url ,body).map(
            res => res.json()
        )
     
    }

networksettingsUpdatedhcp(f,id){



     var url="http://api.dalan.pro/networksetting/update/"+id;
        
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");     

    let body={
    ipaddr: "dhcp",
    subnet: "dhcp",
    gateway: "dhcp",
    dns1: "dhcp",
    dns2: "dhcp",
    hostname:f.hostname
    
    };

    console.log(body);

        return this.http.post(url ,body).map(
            res => res.json()
        )
     
    }

getNetworkupdate(){
     
     var url="http://api.dalan.pro/networksetting/updatenetwork";
        
        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'GET');
       
        return this.http.get(url).map(
            res => res.json()
        )
     
    }

getUpgrade(){
     
     var url="http://api.dalan.pro/setting/upgrade";
        
        var headers = new Headers();
        headers.append('Content-Type',
            'application/x-www-form-urlencoded'
        );
        headers.append('Access-Control-Allow-Methods', 'GET');
       
        return this.http.get(url).map(
            res => res.json()
        )
     
}


saveData1(f){

     var url="http://api.dalan.pro/insertData";
        
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');

    let body={
    userName:f.userName,
    fullName:f.fullName,
    password:f.password
 
    };

    console.log(body);
       
        return this.http.post(url ,body).map(
            res => res.json()
        )
     
    }

//update data

update(f,id){

     var url="http://api.dalan.pro/insertData/update/"+id;
        
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");     

    let body={
    userName:f.userName,
    fullName:f.fullName,
    password:f.password
 
    };

    console.log(body);

        return this.http.post(url ,body).map(
            res => res.json()
        )
     
    }


deleteData(f){

     var url="http://api.dalan.pro/insertData/delete/"+f;

        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append("Cache-Control", "no-cache");
        headers.append("Cache-Control", "no-store");

        return this.http.get(url).map(
            res => res.json()
        )
     
    }


login(f){

     var url="http://api.dalan.pro/insertData/login";

        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Methods', 'POST');
       
        return this.http.post(url ,f).map(
            res => res.json()
        )
     
    }

}
