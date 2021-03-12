import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import * as firebase from 'firebase';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { resolve } from 'url';
import { reject } from 'q';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable()
export class ArticlesService {

  allArticles:Object = {};

  articles: Article[] = [];

  articlesTypes: Article[] = [];
  typesSelected: string[] = [];
  typesSubject = new Subject<string[]>();

  articlesSources: Article[] = [];
  sourcesSelected: string[] = [];
  sourcesSubject = new Subject<string[]>();

  articlesSubject = new Subject<Article[]>();
  allArticlesSubject = new Subject<Object>();
  lastId: number;

  dataLoadedArraySubject = new Subject<boolean[]>();
  dataLoadedArraySubscription = new Subscription;
  dataLoaded: boolean = false;
  dataLoadedArray: boolean[] = [];

  sections = [
    {name:"Les plus populaires", img:"assets/img/icons/iconUne.png"},
    {name:"Livraison rapide", img:"assets/img/icons/iconDivers.png"},
    {name:"Evénements",  img:"assets/img/icons/iconDivers.png"},
    {name:"Salés", img:"assets/img/icons/iconDivers.png"},
    {name:"Sucrés",  img:"assets/img/icons/iconDivers.png"},
    {name:"Plat sénégalais", img:"assets/img/icons/iconDivers.png"},
    {name:"Gastronomie africaine", img:"assets/img/icons/iconDivers.png"},
    {name:"Monde arabe", img:"assets/img/icons/iconDivers.png"},
  ];

  
  constructor(private router: Router, private globalService: GlobalService){
    this.sections.forEach(() => {
      this.dataLoadedArray.push(false);
    });
    
    this.router.events.subscribe(
      (e)=>{
        if(e instanceof NavigationEnd){
          this.emitDataLoadedArray();
        }
      }
    );
    this.dataLoadedArraySubscription = this.dataLoadedArraySubject.subscribe(
      (array: boolean[]) => {

        if(! array.includes(false)){
          this.dataLoaded = true;
          console.log("ALL");
          console.log(this.allArticles);

          this.emitArticles();
          this.emitAllArticles();
          this.emitSources();
          
          this.typesSelected = this.getArticlesTypes();
          this.sourcesSelected = this.getArticlesSources();
          this.saveTypes();
          this.saveSources();
        }
      }
  );

    this.getArticles();
  }

  getArticlesTypes(){
    console.log("Let Types");
      return this.getAllArticlesTypes();
  }

  getArticlesSources(){
    console.log("Let Sources");
      return this.getAllArticlesSources();
  }

  private handleError<T>(operation = 'operation', result?:T) {
      return (error: any): Observable<T> => {
          console.log(error);
          console.log(`${operation} failed: ${error.message}`);

          return of(result as T);
      };
  }
  snapshotToArray(snapshot: firebase.database.DataSnapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.id = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};

  emitDataLoadedArray() {
    this.dataLoadedArraySubject.next(this.dataLoadedArray);
  }
  emitAllArticles() {
    this.allArticlesSubject.next(this.allArticles);
  }
  emitArticles() {
    this.articlesSubject.next(this.articles);
  }
  saveArticles() {
    if(this.articles.length > 0){
      firebase.database().ref('/traiteurs').set(this.articles);
    }
  }
  getArticles() {
      firebase.database().ref('/traiteurs')
        .on('value', (data: firebase.database.DataSnapshot) => {
          
            let allArticlesHere = data.val() ? this.snapshotToArray(data).reverse() : [];
            console.log("allArticlesHere BEGIN");
            console.log(allArticlesHere);
            console.log("allArticlesHere END");
            let i = 0;
            this.sections.forEach(section => {
              this.trierArticles(allArticlesHere).then((articlesTries: Article[])=>{
                this.getArticlesIn(articlesTries, section.name).then((articlesIn: Article[])=>{
                  //this.allArticles[section.name] = articlesIn;
                  this.allArticles[section.name] = allArticlesHere;
                  console.log("It's done ",section.name);
                  
                  this.dataLoadedArray[i]=true;
                  i++;
                  this.emitDataLoadedArray();
                });
              });
            });
            
            console.log(this.allArticles);
          }
        );
  } 
  getLastId() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/traiteurs').on('value',
          (data: firebase.database.DataSnapshot) => {
            resolve(data.numChildren());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleArticle(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/traiteurs/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  getAllArticlesTypes(): string[] {
    return [
      "Les plus populaires","Livraison rapide","Evénements","Salés","Sucrés","Plat sénégalais",
      "Gastronomie africaine","Monde arabe"
    ];
  }
  
  getAllArticlesSources(): string[] {
    return [
      '0-1 Km','1-5 Kms','5-10 Kms','10-20Kms'
    ];
  }

  createNewArticle(newArticle: Article) {
    this.articles.push(newArticle);
    this.saveArticles();
    this.emitArticles();
  }

  removeArticle(article: Article) {
    if(article.photo1) {
      const storageRef = firebase.storage().refFromURL(article.photo1);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo1! : ' + error);
        }
      );
    }
    const articleIndexToRemove = this.articles.findIndex(
      (articleEl) => {
        if(articleEl === article) {
          return true;
        }
      }
    );
    this.articles.splice(articleIndexToRemove, 1);
    this.saveArticles();
    this.emitArticles();
}
//


isIn(array: string[], sectionName){
  if(array.includes(sectionName)){
    return true;
  }
  return false;
}

getArticlesIn(articles: Article[], sectionName){
  return new Promise((resolve)=>{
    let articlesIn: Article[] = [];

    for(let i = 0 ; i < articles.length; i++){
      if(this.isIn(articles[i].types, sectionName)){
        articlesIn.push(articles[i]);
      }
    }
    resolve(articlesIn);
  });
}
trierArticles(articles: Article[]){
  return new Promise((resolve)=>{
    let articlesRetournes: Article[] = [];
    
    for(let i = 5; i>0; i--){
        articles.reverse().forEach(article => {          
          if(+article.importance === i){
            //article.dateSince = this.timeSince(article.date);
            article.date = this.timeSince(article.date);
              if(!this.getAllArticlesSources().includes(article.source)){
                article.source = 'Lieu inconnue';
              }
              articlesRetournes.push(article);
          }

        });
    }
    resolve(articlesRetournes);
  });
}
timeSince(date) {
  var seconds = Math.floor((Date.now() - new Date(date).getTime()));
  //console.log('Date now:'+Date.now());   
  //console.log('Date a:'+new Date(date).getTime());

  var interval = Math.floor(seconds / 31536000000);

  if (interval > 1) {
  return interval + " ans";
  }
  interval = Math.floor(seconds / 2592000000);
  if (interval > 1) {
  return interval + " mois";
  }
  interval = Math.floor(seconds / 86400000);
  if (interval > 1) {
  return interval + " jours";
  }
  interval = Math.floor(seconds / 3600000);
  if (interval > 1) {
  return interval + " heures";
  }
  interval = Math.floor(seconds / 60000);
  if (interval > 1) {
  return interval + " minutes";
  }
  return Math.floor(seconds) + " secondes";
}

  uploadFile(dataURI: any) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName).putString(dataURI, 'data_url');
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
            console.log('images/' + almostUniqueFileName);
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            console.log('Chargement réussi');
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

//   searchArticles(term: string): Observable<Article[]> {
//     if(!term.trim()) {
//         return of([]);
//     }

//     return this.http.get<Article[]>(`${this.herosUrl}/?firstname=${term}`).pipe(
//         tap(_ => this.log(`found hero matching ${term}`)),
//         catchError(this.handleError<Article[]>(`searchArticles`, []))
//     );
// }

  searchArticles(term: string): Observable<Article[]> {
    if(!term.trim()) {
        return of([]);
    }

    var found : Article[] = [];
    
    this.articles.forEach(element => {
      const titreInsensible = element.nom.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const termInsensible = term.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
      
      if(titreInsensible.includes(termInsensible)){
        found.push(element);
      }
    });
    return of(found);
  }

  //
  emitTypes() {
    this.typesSubject.next(this.typesSelected);
  }
  saveTypes(){
    return new Promise((resolve, reject) => {
      this.emitTypes();
    });
  }

  removeType(str: string){
    var index = this.typesSelected.indexOf(str, 0);
    if (index > -1) {
       this.typesSelected.splice(index, 1);
    }
    this.saveTypes();
  }
  addType(str: string){
    this.typesSelected.push(str);
    this.saveTypes();
  }
  removeAllTypes(){
    this.typesSelected = [];
    this.saveTypes();
  }
  addAllTypes(){
    this.typesSelected = this.getAllArticlesTypes();
    this.saveTypes();
  }
  //
  emitSources() {
    this.sourcesSubject.next(this.sourcesSelected);
  }
  saveSources(){
    return new Promise((resolve, reject) => {
      this.emitSources();
    });
  }
  removeSource(str: string){
    var index = this.sourcesSelected.indexOf(str, 0);
    if (index > -1) {
       this.sourcesSelected.splice(index, 1);
    }
    this.saveSources();
  }
  addSource(str: string){
    this.sourcesSelected.push(str);
    this.saveSources();
  }
  removeAllSources(){
    this.sourcesSelected = [];
    this.saveSources();
  }
  addAllSources(){
    this.sourcesSelected = this.getAllArticlesSources();
    this.saveSources();
  }

  //
  
  toRadians(degrees: number)
  {
    var pi = Math.PI;
    return degrees * (pi/180);
  }
  calculateDistance(){
    this.sections.forEach((section) => {
      this.allArticles[section.name].forEach((article) => {
        
      console.log(article);
      var lat1 = article.latitude;
      var lon1 = article.longitude;
      var lat2 = this.globalService.position.latitude;
      var lon2 = this.globalService.position.longitude;

        
      var R = 6371; // metres
      var φ1 = this.toRadians(lat1);
      var φ2 = this.toRadians(lat2);
      var Δφ = this.toRadians((lat2-lat1));
      var Δλ = this.toRadians((lon2-lon1));

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = R * c;
      article.distance = d;

      if(article.distance <= 1){
        article.source = '0-1 Km';
      }
      else if(article.distance <= 5 &&  article.distance > 1){
        article.source = '1-5 Kms';
      }
      else if(article.distance <= 10 &&  article.distance > 5){
        article.source = '5-10 Kms';
      }
      else if(article.distance <= 20 &&  article.distance > 10){
        article.source = '10-20Kms';
      }
      else{
        article.source = "Inconnue";
      }
      console.log(article.nom,"-",article.distance);
      });
    });
  }
}