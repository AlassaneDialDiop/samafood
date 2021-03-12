import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../models/article.model';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  page : number = 0;

  constructor(
    private globalService: GlobalService ) { 
                }

                modifyPage(num: number){
                  if(num>0 && this.globalService.savedData.savedArticles[10*(this.page)+9] != undefined){
                    this.page += num;
                  }
                  
                  if(num<0 && ((this.page+num) >= 0)){
                    this.page += num;
                  }
                }
}
