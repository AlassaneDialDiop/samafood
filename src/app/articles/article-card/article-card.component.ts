import {Component, OnInit, ElementRef, Output, EventEmitter, HostListener,Input} from '@angular/core';
import { Section } from '../../models/section.model';
import { Article } from '../../models/article.model';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { ProfilService } from '../../services/profil.service';



import { PopupArticleComponent  } from '../popup-article/popup-article.component'
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { Subscription, Subject } from 'rxjs';

@Component({
    selector: 'article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss']
  
})
export class ArticleCardComponent implements OnInit{

    @Input()  article: Article;
    
  savedSubscription : Subscription;

  saved: boolean = false;

    constructor(
      private articlesService: ArticlesService,
      private modalController: ModalController,
      private router: Router,
      private globalService: GlobalService
      // public dialog: MatDialog
      ) { }

  ngOnInit() {
  }
  onDeleteArticle(article: Article){
    this.articlesService.removeArticle(article);
  }

  onViewArticle(id: number) {
    this.router.navigate(['/news', 'view', id]);
  }
  
  
  
  async modalArticle(article: Article) {
    const modal = await this.modalController.create({
      component: PopupArticleComponent,
      componentProps: {
        article: article
      }
    });
    return await modal.present();
  }

  aa(article: Article){
    console.log("Article");
    console.log(article);
    console.log("Saved Articles");
    console.log(this.globalService.savedArticlesId);
    console.log("Includes");
    console.log(this.globalService.savedArticlesId.includes(article.id));
  }
}

