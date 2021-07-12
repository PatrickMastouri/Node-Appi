export class Payment {
    id: string;
    
    cost: number;
    paymentmethode: string;
    nom: string;
    project_id: string;
    user_id:string;

    constructor(id='',cost=0,paymentmethode='',nom='',project_id='',user_id=''){

        this.id=id;
        this.cost = cost;
        this.paymentmethode= paymentmethode;
        this.nom = nom;
        this.project_id = project_id;
        this.user_id = user_id;

    }

    
}