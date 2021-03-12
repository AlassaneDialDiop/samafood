import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { of } from 'rxjs';
import {
	debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../models/article.model';
import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'article-search',
	templateUrl: './article-search.component.html',
	styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent implements OnInit {

	private searchTerms = new Subject<string>();
	articles$: Observable<Article[]>;

	constructor(
		private articlesService: ArticlesService,
		private router: Router,
		//private modalService: NgbModal
		) { }

	ngOnInit(): void {
		this.articles$ = this.searchTerms.pipe(
			// attendre 100ms de pause entre chaque requête
			debounceTime(100),
			// ignorer la recherche en cours si c'est la même que la précédente
			distinctUntilChanged(),
			// on retourne la liste des résultats correpsondant aux termes de la recherche
			switchMap((term: string) => this.articlesService.searchArticles(term)),
		);
	}
	// Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
	search(term: string): void {
		this.searchTerms.next(term);
	}


	gotoDetail(article: Article): void {
		let link = ['/article', article.id];
		this.router.navigate(link);
	}

	/*
	open(article: Article) {
		const modalRef = this.modalService.open(NgbdModalContentArticle);
		modalRef.componentInstance.article = article;
	  }*/
}