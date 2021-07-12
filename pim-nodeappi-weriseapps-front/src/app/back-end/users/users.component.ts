import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Domain/Model/User';
import { UserService } from 'src/app/Domain/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit { 

  Users : [User];
  nbUsers: number;
  constructor(private userService : UserService) {
    this.userService.getAllUsers().subscribe(res => {
      this.Users = res.data;
      this.nbUsers = this.Users.length
    });
  }

  ngOnInit(): void {
    
  }

}
