import { Component, OnInit, OnChanges } from '@angular/core';
import { Article } from '../../models/article.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-article-rubrique',
  templateUrl: './article-rubrique.component.html',
  styleUrls: ['./article-rubrique.component.scss']
})
export class ArticleRubriqueComponent {

  rubriqueName: string = '';

  sourcesSubscription: Subscription;
  allSources: string[];
  toutRienSource: string = "Aucun";

  articlesRubrique : Article[] = [];

  page : number = 0;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService, private globalService: GlobalService,
              private router: Router){
    let urlSplitted = this.router.url.replace("%C3%A9","é").replace("%C3%A9","é").split("/");
    this.rubriqueName = urlSplitted[urlSplitted.length-1].charAt(0).toUpperCase() + urlSplitted[urlSplitted.length-1].slice(1);
    
    console.log(this.rubriqueName);
    //

    this.allSources = this.articlesService.getAllArticlesSources();
  
    this.sourcesSubscription = this.articlesService.sourcesSubject.subscribe(
        (sources: string[]) => {
            this.articlesRubrique = this.garderArticlesRubrique(this.articlesService.allArticles[this.rubriqueName]);
        }
    );
  }
  garderArticlesRubrique(articles:Article[]){
    let articlesGardes = [];
    articles.forEach(element => {
      if(this.articlesService.sourcesSelected.includes(element.source)){
        articlesGardes.push(element);
      }
    });
    console.log("gardes");
    console.log(articlesGardes);
    return articlesGardes;
  }
  
  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  hasSource(source: string): boolean {
    let index = this.articlesService.sourcesSelected.indexOf(source);
    if(~index){
      return true;
    }
    return false;
  }

  isSourcesValid(source: string) { 
    if(this.articlesService.sourcesSelected.length >= 3 && !this.hasSource(source)){
      return false;
    }
    return true;
  }
  
  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
  selectSource($event: any, source: string): void {
    let checked = $event.target.checked;
    console.log(checked);
    console.log(this.articlesService.sourcesSelected);
    if ( !checked ) {
      this.articlesService.removeSource(source);
    } else {
      this.articlesService.addSource(source);
    }
    console.log(this.articlesService.sourcesSelected);
  }

  printSources(){
    console.log(this.articlesService.sourcesSelected);
  }
  
  toutRienFonctionSource(){
      if(this.toutRienSource === "Aucun"){
          this.articlesService.removeAllSources();
          this.toutRienSource = "Tout";
      }
      else{
        this.articlesService.addAllSources();
        this.toutRienSource = "Aucun";
      }
  }

  modifyPage(num: number){
    if(num>0 && this.articlesRubrique[10*(this.page)+9] != undefined){
      this.page += num;
    }
    
    if(num<0 && ((this.page+num) >= 0)){
      this.page += num;
    }
  }
}