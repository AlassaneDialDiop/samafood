import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { GlobalService } from './global.service';

@Injectable()
export class LogService {
  disableButtonNoLog : boolean = false;

  constructor(
    private alertController: AlertController,
    private globalService: GlobalService,
    private loadingController: LoadingController,
    private router: Router
  ) {
  }


  goHome(username = undefined, rs = undefined){

    this.disableButtonNoLog = true;
    console.log("navigate");
    this.router.navigate(["/news"]);
    this.disableButtonNoLog = false;
  }

  async presentLoading(loading) {
    return await loading.present();
  };
}
