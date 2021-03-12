import { Component } from '@angular/core';

@Component({
	selector: 'page-404',
	template: `
    <div class='center'>
        <h1>Hey, cette page n'existe pas !</h1><br>
      <img src="https://vignette.wikia.nocookie.net/lionking/images/4/41/Simba_sad_1.png"/><br>
      <div class="brand-logo center grey lighten-2">
      <a routerLink="/news" class="btn-flat" style="font-size: 2.5em; color: purple; margin: 20px; font-weight: 600;">
        Retourner à l' accueil
      </a>
      </div>
    </div>
  `
})
export class PageNotFoundComponent { }