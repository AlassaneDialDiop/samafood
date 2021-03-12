import { Component, ElementRef } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Subscription } from 'rxjs';
import { Article } from '../../models/article.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'container-article',
    templateUrl: './container-article.component.html',
    styleUrls: ['./container-article.component.scss']
  
})

export class ContainerArticleComponent{

    sourcesSubscription: Subscription;
    allSources: string[];
    toutRienSource: string = "Aucun";

    typesSubscription: Subscription;
    allTypes: string[];
    toutRienRubrique: string = "Aucun";
  
    constructor(    private el: ElementRef,
                    private articlesService: ArticlesService
                    ) { 
                      
        this.allTypes = this.articlesService.getAllArticlesTypes();
        this.allSources = this.articlesService.getAllArticlesSources();
      
    }
    

  
  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  hasType(type: string): boolean {
    let index = this.articlesService.typesSelected.indexOf(type);
    if(~index){
      return true;
    }
    return false;
  }

  isTypesValid(type: string) { 
    if(this.articlesService.typesSelected.length >= 3 && !this.hasType(type)){
      return false;
    }
    return true;
  }
  
  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
  selectType($event: any, type: string): void {
    let checked = $event.target.checked;
    console.log(checked);
    if ( !checked ) {
      this.articlesService.removeType(type);
    } else {
      this.articlesService.addType(type);
    }
  }

  printTypes(){
    console.log(this.articlesService.typesSelected);
  }
  
  toutRienFonctionRubrique(){
      if(this.toutRienRubrique === "Aucun"){
          this.articlesService.removeAllTypes();
          this.toutRienRubrique = "Tout";
      }
      else{
        this.articlesService.addAllTypes();
        this.toutRienRubrique = "Aucun";
      }
  }
  //
  
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
  emm(){
    this.articlesService.typesSubject.next(this.articlesService.typesSelected);
  }
}