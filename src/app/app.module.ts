import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { StatusBar } from '@ionic-native/status-bar/ngx';

//

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { TitleService } from './services/title.service';
import { PageNotFoundComponent } from './page-not-found.component';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { SingleArticleComponent } from './articles/single-article/single-article.component';
import { ArticleRubriqueComponent } from './articles/article-rubrique/article-rubrique.component';
import { ArticleFormComponent } from './articles/article-form/article-form.component';
import { ArticleImportantCardComponent } from './articles/article-important-card/article-important-card.component';
import { ArticleCardComponent } from './articles/article-card/article-card.component';
import { ArticleSearchComponent } from './articles/article-search/article-search.component';
import { SectionArticleComponent } from './articles/section-article/section-article.component';
import { PopupArticleComponent } from './articles/popup-article/popup-article.component';
import { ContainerArticleComponent } from './articles/container-article/container-article.component';
import { ArticlesService } from './services/articles.service';
import { ArticleTypeColorPipe } from './articles/article-type-color.pipe';

import { ArticleSourceColorPipe } from './articles/article-source-color.pipe';

import { ProfilService } from './services/profil.service';
import { GlobalService } from './services/global.service';
import { LogService } from './services/log.service';

import { MaterialModule } from './material.module';
import { BorderCardDirective } from './border-card.directive';
import { AppLoaderComponent} from './app-loader.component';

import { ImageCropperComponent} from "ngx-img-cropper";

import { ProfilComponent } from './profil/profil.component';

import { LoginComponent } from './login/login.component';

import { GeoComponent } from './geo/geo.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Network } from '@ionic-native/network/ngx';
//

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profil',             component: ProfilComponent},
  { path: 'geo',             component: GeoComponent},
  { path: 'news',             component: ArticleListComponent},
  { path: 'news/new',         component: ArticleFormComponent},
  { path: 'news/view/:id',    component: SingleArticleComponent},
  { path: 'news/rubriques/:rubrique',    component: ArticleRubriqueComponent},
  { path: '',                 redirectTo: 'news',              pathMatch: 'full'},
  { path: '**',               component: PageNotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    AppLoaderComponent,
    ImageCropperComponent,
    ArticleListComponent,
    SingleArticleComponent,
    ArticleRubriqueComponent,
    ArticleSearchComponent,
    ArticleFormComponent,
    ArticleCardComponent,
    ArticleImportantCardComponent,
    ArticleTypeColorPipe,
    ArticleSourceColorPipe,
    ContainerArticleComponent,
    SectionArticleComponent,
    BorderCardDirective,
    PageNotFoundComponent,
    PopupArticleComponent,
    LoginComponent,
    GeoComponent
  ],
  entryComponents: [
    PopupArticleComponent
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes), 
    IonicModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    ProfilService,
    ArticlesService,
    GlobalService,
    TitleService,
    LogService,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
