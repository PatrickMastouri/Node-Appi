export class User {
  id: any;
  nom: string;
  prenom: string;
  username: string ;
  daten: Date;
  mail: string;
  password: string;
  adresse: string;
  city: string;
  postalcode: string;
  phone: string;
  gender: string;


  constructor(id = 0, nom = '', prenom= '', username = '', gender = '', daten= new Date(), mail= '', password= '', adresse= '', city= '', postalcode= '', phone= '') {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.username = username;
    this.mail = mail;
    this.daten = daten;
    this.password = password;
    this.adresse = adresse;
    this.city = city;
    this.postalcode = postalcode;
    this.phone = phone;
    this.gender = gender

  }
}
