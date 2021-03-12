
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { TitleService } from './services/title.service';
import { GlobalService } from './services/global.service';

import { firebaseConfig } from './credentials';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public devWidth = this.platform.width();
  
  constructor(
    private router: Router, 
    private titleService: TitleService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private globalService: GlobalService
    ){
    this.initializeApp();
    
    firebase.initializeApp(firebaseConfig);

    
    console.log('FFFFF');
  }

  initializeApp() {
    this.platform.ready().then(() => {
         
      const sub = this.platform.backButton.subscribeWithPriority(9999, () => {
        console.log(this.router.url)
        if((this.router.url === '/news')){
          this.navCtrl.pop();
        }
      });
          this.router.navigate(["/login"]);
          this.devWidth = this.platform.width();
          this.statusBar.styleDefault();
          this.splashScreen.hide();
      });
    }
  

  
  ngOnInit(): void {
    this.titleService.init();
  }
    
  goBack(): void {
    this.router.navigate(['/news']);
  }
}
