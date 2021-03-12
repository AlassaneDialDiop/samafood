import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'articleTypeColor'})
export class ArticleTypeColorPipe implements PipeTransform {
  transform(type: string): string {

    let color: string;

    switch (type) {
        case 'Sport':
            color = 'teal';
        break;
        case 'Politique':
            color = 'red';
        break;
        case 'Société':
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
        default:
            color = 'bluegrey';
        break;
    }


    return 'material-' + color;

  }
}