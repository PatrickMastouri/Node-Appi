import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/Domain/Model/User';
import { UserService } from 'src/app/Domain/Services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy {

  registerForm: FormGroup ;
  submitted = false;
  unsibscribe = new Subject<void>();
  error = "";
  showError = false;

  constructor(private userService: UserService,
              private route: Router) {
    this.registerForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.email, Validators.required]),
      daten : new FormControl('', [Validators.required]),
      nom : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {}

  submitForm(): void{
    const user  = new User();
    user.nom = this.registerForm.controls.nom.value;
    user.username = this.registerForm.controls.username.value;
    user.daten = this.registerForm.controls.daten.value;
    user.password = this.registerForm.controls.password.value;
    user.mail = this.registerForm.controls.email.value;
    this.userService.register(user).pipe(takeUntil(this.unsibscribe)).subscribe(
    (rep) => {
      console.log(rep);
      if (rep.token  && rep.id){
        localStorage.setItem('token', rep.token);
        localStorage.setItem('id', rep.id);
        this.route.navigate(['/front/home']);
      }
    }, (error) => {
      if (error.error.succes == 0){
        console.log(error);
        this.error = error.error.message;
        this.showError = true;
      }
      else{
        console.log(error);
        this.error = "DDDDDD";
        this.showError = true;
      }
    }
    );
  }

  ngOnDestroy(): void{
    this.unsibscribe.next();
    this.unsibscribe.complete();
  }
}
