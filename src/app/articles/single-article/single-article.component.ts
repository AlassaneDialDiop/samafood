import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service'

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {

  article: Article;
  articleDate: Date;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService,
              private router: Router) {}

  ngOnInit() {
    console.log('1');
    this.article = new Article();
    console.log('2');
    const id = this.route.snapshot.params['id'];
    this.articlesService.getSingleArticle(+id).then(
      (article: Article) => {
        console.log('3');
        this.article = article;
        this.articleDate = new Date(this.article.date);
      }
    );
    
    console.log('5');
    console.log('date: '+ this.article.date);
  }
  iik(){
    
    console.log('date: '+ this.article.extrait);
  }

  onBack() {
    this.router.navigate(['/news']);
  }
}