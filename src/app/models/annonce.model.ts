export class Annonce{
    id:number = 0;
    photo:string = '';
    extrait: string = '';
    importance: string = '';
    types: string[] = [];
    source: string = '';
    date: string = '';
    nbVues: number = 0;
    nbCommentaires: number = 0;
    nbPartages: number = 0;

    constructor(    public titre: string,
                    public auteur: string,
                    public  contenu:string){}
}