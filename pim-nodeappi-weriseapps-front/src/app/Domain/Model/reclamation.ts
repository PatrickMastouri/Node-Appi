import {User} from "./User";

export class Reclamation {
  id: string;
  subject: string;
  etat: string
  description: string;
  dateUpdated: string;
  dateCreated: string;
  UserId: string;
  user: User;

  constructor(id = '', subject = '', description =  '',etat='', dateUpdated= '', dateCreated= '', UserId= '') {
    this.id = id;
    this.subject = subject;
    this.description = description;
    this.etat = etat;
    this.dateUpdated = dateUpdated;
    this.dateCreated = dateCreated;
    this.UserId = UserId;
  }


}
