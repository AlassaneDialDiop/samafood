import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GlobalService } from '../services/global.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {

  constructor(
    public logService: LogService,
    public globalService: GlobalService
  ) { 
  }
}