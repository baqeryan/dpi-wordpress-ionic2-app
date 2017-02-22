import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {LocalStorage, Storage} from 'ionic-angular';
import {Push, Device} from 'ionic-native';
import {SITE_URL, GCM_SENDER_ID} from '../constants';

@Injectable()
export class PushProvider {
  apiURL:string = SITE_URL;
  storage = new Storage(LocalStorage);
  push:any;
  constructor(public http:Http) {}

  init() {
     this.push = Push.init({
        android: { senderID: GCM_SENDER_ID },
        ios: {
            alert: "true",
            badge: true,
            sound: 'false'
        },
        windows: {}
     });

     this.push.on('registration', (data) => {
         this.storage.set('token', data.registrationId);
       this.registerDevice();
     });

     this.push.on('notification', (data) => {
         console.log(data);
     });
  }

  transformRequest(obj) {
    let p, str;
    str = [];
    for (p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  }

  registerDevice() {
    let email=Device.device.serial;
    let url = this.apiURL + '/wp-rest/apnwp/register?';
    let os = Device.device.platform;
    return this.storage.get('token')
    .then(data => {
      if (!data) data='0000010000';
      if (!email) email="test@test.com";
      if(!os) os="android";
      let request=this.transformRequest({os_type:os,user_email_id:email,device_token:data});
      url=url+request;
      return this.http.get(url).map((res: Response) => res.json())
        .subscribe(res => {
        });
    });
  }

  unregisterDevice() {
    let email=Device.device.serial;
    let url = this.apiURL + '/wp-rest/apnwp/unregister';
    let os = Device.device.platform;
      return this.storage.get('token')
      .then(data => {
        if (!data) data='0000010000';
        if (!email) email="test@test.com";
        if(!os) os="android";
        let request=this.transformRequest({os_type:os,user_email_id:email,device_token:data});
        url=url+request;
        return this.http.get(url);
      });
  }
}
