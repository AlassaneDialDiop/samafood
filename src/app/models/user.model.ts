export class User{
    photo:string;
    dateCreation: Date;
    isAuteur: boolean = false;
    isAdmin: boolean = false;

    constructor(    public email: string,
                    public password: string,
                    public nom: string,
                    public prenom: string,
                    public dateDeNaissance: Date){}
}