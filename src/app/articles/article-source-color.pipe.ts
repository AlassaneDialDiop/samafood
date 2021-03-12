import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'articleSourceColor'})
export class ArticleSourceColorPipe implements PipeTransform {
  transform(source: string): string {

    let color: string;

    switch (source) {
        case 'Autres sources':
            color = 'grey';
        break;
        /*
        case 'Seneweb':
            color = 'red';
        break;
        case 'Leral':
            color = 'purple';
        break;
        case 'Santé':
            color = 'pink';
        break;
        case 'Culture':
            color = 'deeppurple';
        break;
        case 'Education':
            color = 'indigo';
        break;
        case 'Divers':
            color = 'lightblue';
        break;
        case 'Religion':
            color = 'cyan';
        break;
        case 'International':
            color = 'lightgreen';
        break;
        case 'Economie':
            color = 'lightyellow';
        break;
        case 'Musique':
            color = 'deeporange';
        break;
        case 'Divertissement':
            color = 'lime';
        break;
        case 'Cinéma':
            color = 'orange';
        break;
        case 'Technologie':
            color = 'grey';
        break;
        case 'Evénement':
            color = 'bluegrey';
        break;
        case 'People':
            color = 'brown';
        break;
        */
        default:
            color = 'black';
        break;
    }


    return 'material-' + color;

  }
}