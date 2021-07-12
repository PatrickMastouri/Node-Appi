import {User} from "./User";

export class Posts {
  id: string;
  title: string;
  content: string;
  tags: string;
  dateUpdated: string;
  likes: number;
  dateCreated: string;
  UserId: string;
  forumId: string;
  owner: string;
  user: User;
  constructor(id = '', title = '', content =  '', tags =  '', dateUpdated= '', likes = 0, dateCreated= '', UserId= '',forumId='') {
  this.id = id;
  this.title = title;
  this.content = content;
  this.tags = tags;
  this.dateUpdated = dateUpdated;
  this.likes = likes;
  this.dateCreated = dateCreated;
  this.UserId = UserId;
  this.forumId = forumId;
}
}
