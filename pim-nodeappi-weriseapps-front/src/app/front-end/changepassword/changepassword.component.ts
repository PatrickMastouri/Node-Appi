import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/Domain/Services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  editPassForm: any;
  user: any;
  userdaten: any;
  idUser = localStorage.getItem('id');
  showError: boolean;
  updatedSuccessfully: boolean;
  error: string;
  updatedSucc: string;
  unsibscribe = new Subject<void>();

  constructor(private userService : UserService) { 
    this.editPassForm = new FormGroup({
      mail : new FormControl('', [Validators.email, Validators.required]),
      code : new FormControl('', [Validators.required]),
      newpassword : new FormControl('', [Validators.required])
    });
  }

  ngOnInit(){
    this.showError = false;
    this.updatedSuccessfully = false;
    return this.userService.getUser(this.idUser)
    .subscribe(res => {
        console.log(res);
        this.user= res.data;
        this.editPassForm.controls.mail.setValue(this.user.mail);
        console.log(this.user);
        console.log(this.idUser);
  }, err => {
        console.log(err); 
      })
  }
  

  submitForm(): void{
    this.showError = false;
    this.updatedSuccessfully = false;
    const code = this.editPassForm.controls.code.value;
    const password = this.editPassForm.controls.newpassword.value;
    const mail = this.editPassForm.controls.mail.value;
    this.userService.changePassword(code, mail, password).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        console.log(rep);
        if (rep.succes == 1){
          this.updatedSuccessfully = true;
        }else{
          alert(rep.message);
        }
      }, (error) => {
        console.log(error);
      }
    )};

}
