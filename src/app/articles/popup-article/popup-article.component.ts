
import {Component, Inject} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Article } from '../../models/article.model';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GlobalService } from 'src/app/services/global.service';
import { Subscription } from 'rxjs';
export interface DialogData {
  article: Article
}


@Component({
  selector: 'popup-article',
  templateUrl: './popup-article.component.html',
  styleUrls: ['./popup-article.component.scss']
})
export class PopupArticleComponent {
  article;
  
  
  savedSubscription : Subscription;

  saved: boolean = false;

  constructor(
    private navParams: NavParams, 
    private modalController: ModalController,
    private iab: InAppBrowser,
    private globalService: GlobalService
    ) {
      this.article = this.navParams.get('article');
      console.log(this.article);
    }
    
    closeModal(){
    this.modalController.dismiss();
  }

  openArticleInBrowser(article: Article){
    const browser = this.iab.create(article.siteUrl);
  }
}