import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/Domain/Services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  unsibscribe = new Subject<void>();
  error = "";
  showError = false;
  constructor( private userService: UserService, private router: Router) {
      this.signinForm = new FormGroup({
      email : new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  ngOnInit(): void {
  }

  submitForm(): void{
    const password = this.signinForm.controls.password.value;
    const mail = this.signinForm.controls.email.value;
    this.userService.signin(mail, password).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        console.log(rep);
        if (rep.token  && rep.id){
          localStorage.setItem('token', rep.token);
          localStorage.setItem('id', rep.id);
          if (rep.role == "Admin"){
            console.log('rep.role')
            this.router.navigate(['/back/dashboard']);
          }else{
            this.router.navigate(['/front/home']);
          }
        }else{
          this.error = rep.message;
          this.showError = true;
        }
      }, (error) => {
        console.log(error);
        this.error = error.error.message;
        this.showError = true;
      }
    );
  }

  ngOnDestroy(): void{
    this.unsibscribe.next();
    this.unsibscribe.complete();
  }

  forgetPasswordClicked(){
    const mail = this.signinForm.controls.email.value;
    this.userService.forgetPasswordSendMail(mail).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        console.log(rep);
        if (rep.succes == 1){
          alert("A Verfication Code has been sent to this mail: "+mail);
          this.router.navigate(['forgetpassword']);
        }else{
          alert(rep.message);
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

}
