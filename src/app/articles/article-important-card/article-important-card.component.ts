import {Component, OnInit, ElementRef, Output, EventEmitter, HostListener,Input} from '@angular/core';
import { Section } from '../../models/section.model';
import { Article } from '../../models/article.model';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';


import { PopupArticleComponent  } from '../popup-article/popup-article.component'
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'article-important-card',
    templateUrl: './article-important-card.component.html',
    styleUrls: ['./article-important-card.component.scss']
  
})
export class ArticleImportantCardComponent implements OnInit{

    @Input()  article: Article;

    constructor(private articlesService: ArticlesService,
                private modalController: ModalController,
                private router: Router,
                private element: ElementRef,
               // public dialog: MatDialog
                ) {}

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
}

