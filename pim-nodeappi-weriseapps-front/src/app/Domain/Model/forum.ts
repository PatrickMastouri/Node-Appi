export class Forum {
  id: string;
  subject: string;
  description: string;
  tag: string;
  interested: number;
  dateUpdated: string;
  dateCreated: string;
  UserId: string;
  owner: string;

  constructor(id = '', subject = '', description =  '', tag =  '', interested = 0, dateUpdated= '', dateCreated= '', UserId= '') {
    this.id = id;
    this.subject = subject;
    this.description = description;
    this.tag = tag;
    this.interested = interested;
    this.dateUpdated = dateUpdated;
    this.dateCreated = dateCreated;
    this.UserId = UserId;
  }
}
