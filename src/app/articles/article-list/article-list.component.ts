import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ArticlesService } from '../../services/articles.service';

import {IonContent} from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  online: User;
  isAuteur: string;
  isAdmin: string;
  nom: string;
  prenom: string

    
  articles: Article[];
  articlesSubscription: Subscription;

  @ViewChild(IonContent, {read: IonContent}) ionContentArticleList: IonContent;

  constructor(private router: Router) {}

  ngOnInit(){
    
    this.isAuteur = localStorage.getItem('isAuteur');
    this.isAdmin = localStorage.getItem('isAdmin');
    this.nom = localStorage.getItem('nom');
    this.prenom = localStorage.getItem('prenom');
    console.log("Test"+ this.isAdmin)
  }

  onNewArticle(){
    this.router.navigate(['/news', 'new']);
  }
}
