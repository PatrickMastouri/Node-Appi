import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../Domain/Services/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  fPasswordForm: FormGroup;
  unsibscribe = new Subject<void>();

  constructor( private userService: UserService, private router: Router) {
      this.fPasswordForm = new FormGroup({
      email : new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
      code : new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  submitForm(): void{
    const code = this.fPasswordForm.controls.code.value;
    const password = this.fPasswordForm.controls.password.value;
    const mail = this.fPasswordForm.controls.email.value;
    this.userService.changePassword(code, mail, password).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        console.log(rep);
        if (rep.succes == 1){
          this.router.navigate(['signin']);
        }else{
          alert(rep.message);
        }
      }, (error) => {
        console.log(error);
      }
    );
  }
  

  ngOnInit(): void {
  }

}
