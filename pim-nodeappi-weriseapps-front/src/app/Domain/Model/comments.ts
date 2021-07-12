import {User} from "./User";

export class Comments {
  id: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
  UserId: string;
  PostId: string;
  owner: string;
 user: User;
  constructor(id = '', content= '' , updatedAt= Date, createdAt= Date, UserId= '',PostId='') {
  this.id = id;
  this.content = content;
  this.updatedAt = new Date(this.updatedAt);
  this.createdAt = new Date(this.createdAt);
  this.UserId = UserId;
  this.PostId = PostId;

}
}
