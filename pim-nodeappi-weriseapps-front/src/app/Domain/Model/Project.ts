export class Project {
  name: string;
  description: string;
  static id: any;
  user_id: string;
  port: any;
  constructor(name = '', description = '',user_id= '',port= '') {
    this.name = name;
    this.description = description;
    this.user_id = user_id;
    this.port = port;
  }

}
