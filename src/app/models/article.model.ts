export class Article{
    id:string = "";
    nom:string = "";
    photo1:string = '';
    telephone1: string = '';
    telephone2: string = '';
    adresse: string[] = [];
    email: string = '';
    latitude: number = 0;
    longitude: number = 0;
    siteUrl: string = '';
    facebookUrl: string = '';
    twitterUrl: string = '';
    instagramUrl: string = '';

    
    extrait: string = '';
    importance: string = '';
    types: string[] = [];
    source: string = '';
    date: string = '';
    
    distance: number = 0;

    constructor(){}
}