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

@Injectable()
export class ProfilService {
  
  constructor(){
    
  }

}