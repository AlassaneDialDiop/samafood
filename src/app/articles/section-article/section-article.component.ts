import {Component, OnInit, ElementRef, Output, EventEmitter, HostListener,Input, OnChanges, AfterViewInit} from '@angular/core';
import { Section } from '../../models/section.model';
import { Article } from '../../models/article.model';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';


import { PopupArticleComponent  } from '../popup-article/popup-article.component'
import { Subscription } from 'rxjs';

@Component({
    selector: 'section-article',
    templateUrl: './section-article.component.html',
    styleUrls: ['./section-article.component.scss']
  
})
export class SectionArticleComponent{

  @Input()  section: Section;
    articles: Article[] = [];
    articlesSection: Article[] = [];

    rubrique: string = '';
    
    articlesSubscription: Subscription;

    constructor(private articlesService: ArticlesService,
                private router: Router,
                private element: ElementRef
                ) {}
  onNewArticle(){
    this.router.navigate(['/news', 'new']);
  }

  onDeleteArticle(article: Article){
    this.articlesService.removeArticle(article);
  }

  onViewArticle(id: number) {
    this.router.navigate(['/news', 'view', id]);
  }
  goTo(){
    this.router.navigate(['/news/rubriques/', this.section.name]);
  }
}
