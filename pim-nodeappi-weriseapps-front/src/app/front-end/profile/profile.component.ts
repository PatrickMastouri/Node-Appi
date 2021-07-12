import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/Domain/Model/User';
import {UserService } from '../../Domain/Services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup ;
  unsibscribe = new Subject<void>();
  user  = new User();
  idUser = localStorage.getItem('id');
  error = "";
  showError = false;
  
  genderSelected: string = "";
  gender: any;
  userdaten: Date;

  ShowForm: boolean = false;

  updatedSucc: "";
  updatedSuccessfully: boolean = false;

  

  constructor(private userService : UserService, private route: Router) { 
        this.editProfileForm = new FormGroup({
        username : new FormControl('', [Validators.required]),
        email : new FormControl('', [Validators.email, Validators.required]),
        daten : new FormControl('', [Validators.required]),
        nom : new FormControl('', [Validators.required]),
        prenom : new FormControl('', [Validators.required]),
        adresse : new FormControl('', [Validators.required]),
        city : new FormControl('', [Validators.required]),
        postalcode : new FormControl('', [Validators.required, Validators.minLength(4)]),
        phone : new FormControl('', [Validators.required, Validators.minLength(8)]),
        gender : new FormControl('', [Validators.required])   
      });
  }



  ngOnInit() {
    return this.userService.getUser(this.idUser)
    .subscribe(res => {
        this.user= res.data;
        this.editProfileForm.controls.nom.setValue(this.user.nom);
        this.userdaten = this.user.daten
        this.editProfileForm.controls.username.setValue(this.user.username);
        this.editProfileForm.controls.email.setValue(this.user.mail);
        this.editProfileForm.controls.prenom.setValue(this.user.prenom);
        this.editProfileForm.controls.adresse.setValue(this.user.adresse);
        this.editProfileForm.controls.city.setValue(this.user.city);
        this.editProfileForm.controls.postalcode.setValue(this.user.postalcode);
        this.editProfileForm.controls.phone.setValue(this.user.phone);
        this.editProfileForm.controls.gender.setValue(this.user.gender);
        console.log(this.user);
        console.log(this.idUser);
  }, err => {
        console.log(err); 
      })
  };



  submitForm(): void{
    this.showError = false;
    this.updatedSuccessfully = false;
    if(this.editProfileForm.invalid){
      console.log("Empty Field");
      this.error = "Empty Field";
      this.showError = true;
    }
    else{
        const user  = new User();
        user.id = localStorage.getItem('id');
        user.nom = this.editProfileForm.controls.nom.value;
        user.prenom = this.editProfileForm.controls.prenom.value;
        user.username = this.editProfileForm.controls.username.value;
        user.daten = this.editProfileForm.controls.daten.value;
        user.mail = this.editProfileForm.controls.email.value;
        user.adresse = this.editProfileForm.controls.adresse.value;
        user.city = this.editProfileForm.controls.city.value;
        user.postalcode = this.editProfileForm.controls.postalcode.value;
        user.phone = this.editProfileForm.controls.phone.value;
        user.gender = this.editProfileForm.controls.gender.value;
        console.log(user)
        this.userService.UpdateUser(user).pipe(takeUntil(this.unsibscribe)).subscribe(
        (rep) => {
          console.log(rep);
          if (rep.succes == 1){
              console.log("updated Successfully");
              this.updatedSucc = rep.message;
              this.updatedSuccessfully = true;
          }
          else if (rep.succes == 0){
              this.error = rep.message;
              this.showError = true;
          }
        }, (error) => {
          console.log(error);
          this.error = "DDDDDD";
          this.showError = true;
        }
        );
    }
  }



  ngOnDestroy(): void{
    this.unsibscribe.next();
    this.unsibscribe.complete();
  }
}
