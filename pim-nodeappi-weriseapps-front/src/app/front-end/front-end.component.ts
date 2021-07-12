import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-end',
  templateUrl: './front-end.component.html',
  styleUrls: ['./front-end.component.css']
})
export class FrontEndComponent implements OnInit {

  logedIn: boolean = false;

  ngOnInit() {}

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    if(token){
      this.logedIn = true;
    }else{
      this.logedIn = false;
    }
  }

}
