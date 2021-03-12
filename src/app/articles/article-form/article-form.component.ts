import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  @Input() article: Article = new Article(); // propriété d'entrée du composant
  types: Array<string> = []; // types disponibles pour un héro : 'Eau', 'Feu', etc.

  contenuArticle: string = '';

  currentDate: Date = new Date(Date.now());
  currentDatestring = this.toDatestring(this.currentDate);

  articleForm: FormGroup;
  fileUploading = false;
  fileUrl: string;
  fileUploaded: boolean = false;
  data: any;
  cropperSettings: CropperSettings;
  saving = false;
  lastId: string = "";

  constructor(private formBuilder: FormBuilder, private articlesService: ArticlesService,
              private router: Router) { 
                
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 720;
    this.cropperSettings.height = 405;
    this.cropperSettings.croppedWidth = 720;
    this.cropperSettings.croppedHeight = 405;
    this.cropperSettings.canvasWidth = 720;
    this.cropperSettings.canvasHeight = 405;
 
    this.data = {};
              }
              
  ngOnInit() {
    this.initForm();
    this.types = this.articlesService.getAllArticlesTypes();
    this.data.image = 'data:image/png;base64,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';
    this.articlesService.getLastId().then(
      (lastId: string) => {
        this.lastId = lastId;
      }
    );
    
    console.log("This is lastid"+ this.lastId);
  }
  
  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  hasType(type: string): boolean {
    let index = this.article.types.indexOf(type);
    if(~index){
      return true;
    }
    return false;
  }

  isTypesValid(type: string) { 
    if(this.article.types.length >= 3 && !this.hasType(type)){
      return false;
    }
    return true;
  }
  
  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
  selectType($event: any, type: string): void {
    let checked = $event.target.checked;
    if ( checked ) {
      this.article.types.push(type);
    } else {
      let index = this.article.types.indexOf(type);
      if (~index) {
        this.article.types.splice(index, 1);
      }
    }
  ;}

  initForm() {
    this.articleForm = this.formBuilder.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      extrait: ['', Validators.required],
      importance: ['',[Validators.required, Validators.pattern(/[0-9a-zA-z]{1,}/)]],
      id: ['',[]],
      source: ['', Validators.required],
      date: ['',[]]
    });
  }
  
  onSaveArticle() {
    this.articlesService.getLastId().then(
      (lastId: string) => {
        this.lastId = lastId;
      }
    );
    this.saving = true;
    this.fileUploading = true;
    this.articlesService.uploadFile(this.data.image).then(
    (url: string) => {
      this.fileUrl = url;
      this.fileUploading = false;
      this.fileUploaded = true;
      
    const titre = this.articleForm.get('titre').value;
    const auteur = this.articleForm.get('auteur').value;
    const extrait = this.articleForm.get('extrait').value;
    const importance = this.articleForm.get('importance').value;
    const source = this.articleForm.get('source').value;
    const id = this.articleForm.get('id').value;

    console.log('A    '+id);

    const newArticle = new Article();
    newArticle.id = this.lastId;
    newArticle.photo1 = this.fileUrl;
    newArticle.extrait = extrait;
    //newArticle.extrait = this.contenuArticle.length>139 ? this.contenuArticle.substring(0, 140) + " ..." : this.contenuArticle;
    newArticle.importance = importance;
    newArticle.types = this.article.types;
    newArticle.source = source;
    newArticle.date = this.currentDatestring;
    console.log('date: '+ this.article.date);
    console.log('date: '+ this.article.date);
    console.log('date: '+ this.article.date);
    console.log('date: '+ this.article.date);
       
    console.log("---- "+this.fileUrl);


    this.articlesService.createNewArticle(newArticle);
    this.router.navigate(['/news']);
    }
  );
}

actualiserDate(){
  this.currentDate = new Date(Date.now());
  this.currentDatestring = this.toDatestring(this.currentDate);
}

updateDate(){
  
  this.currentDatestring =  this.articleForm.get('date').value;
}
printD(){
  
  console.log("---- "+this.currentDatestring);
}
onUploadFile(dataURI: any) {
  this.fileUploading = true;
  this.articlesService.uploadFile(dataURI).then(
    (url: string) => {
      this.fileUrl = url;
      this.fileUploading = false;
      this.fileUploaded = true;
      console.log("00000 "+this.fileUrl);
    }
  );
}
  detectFiles(event) {
    
    var file:File = event.target.files[0];
     console.log("THIS "+ event.target.files[0]);
    // this.croppedImg = event.target.files[0];
    // this.onUploadFile(event.target.files[0]);
}

saveCroppedImg() {
  this.onUploadFile(this.data.image);

}
validCroppedImg() {
  this.fileUploaded = true

}

toDatestring(date: Date): string {
  return (date.getFullYear().toString() + '-' 
     + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
     + ("0" + (date.getDate())).slice(-2))
     + 'T' + date.toTimeString().slice(0,5);
}

printTypes(){
  console.log(this.article.types);
}

  updateContenu(event: any){
    this.contenuArticle = event;
    console.log(this.contenuArticle);
  }

}

