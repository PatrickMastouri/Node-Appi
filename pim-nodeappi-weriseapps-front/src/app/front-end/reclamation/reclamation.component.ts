import {Component, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from '../../Domain/Model/reclamation';
import {ReclamationService} from '../../Domain/Services/reclamation.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  @ViewChild('closeButtonEdit') closeButtonEdit;
  @ViewChild('closeButton') closeButton;
  claims: Reclamation [] = [];
  Rec: Reclamation;
  RecEdit: Reclamation;
  form: FormGroup;
  formEdit: FormGroup;
  ClaimForm: FormGroup;
  unsibscribe = new Subject<void>();


  constructor(private reclamationService: ReclamationService) {
    this.ClaimForm = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): any {
    this.getClaimByUser(localStorage.getItem('id'));
    this.initForm();
  }

  initForm(): any {
    this.form = new FormGroup({
      subject: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+)$')]),
      description: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  getClaimByUser(id: string): any {
    this.reclamationService.getReclamationbyUser(id).subscribe(
      data => this.claims = data.data
    ),
      // tslint:disable-next-line:no-unused-expression
      error => {
        console.log(error);
      };
  }

  AddClaim(): void {
    const claim = new Reclamation();
    claim.subject = this.f.subject.value;
    claim.description = this.f.description.value;
    claim.etat = 'In progress';
    claim.UserId = localStorage.getItem('id');
    console.log(claim);
    this.reclamationService.Create(claim).pipe(takeUntil(this.unsibscribe)).subscribe(
      (rep) => {
        this.claims.push(rep);
        this.ClaimForm.reset();
        this.closeButton.nativeElement.click();

      }, (error) => {
        console.log(error);
      }
    );
  }

  DeleteClaim(id): any {
    this.reclamationService.delete(id).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  UpdateRec(id: string): any {
    this.reclamationService.getReclamationById(id).subscribe(
      data => {
        this.RecEdit = data.data;
        this.initFormEdit(this.RecEdit);
      });
      }
  submitEditRec(): any {

    const myRec = new  Reclamation();
    myRec.id =  this.formEdit.controls.id.value;
    myRec.subject =  this.formEdit.controls.subject.value;
    myRec.description =  this.formEdit.controls.description.value;
    myRec.etat = this.formEdit.controls.etat.value;
    myRec.UserId = this.formEdit.controls.UserId.value;
    this.reclamationService.updateReclamation(this.formEdit.controls.id.value, myRec).subscribe(
      (data) => {
       this.claims.forEach((rec, _) => {

         if (rec.id === myRec.id) {
                rec.subject = myRec.subject;
                rec.description = myRec.description;
            }
          });
       this.closeButtonEdit.nativeElement.click();
      }


    );
  }
  initFormEdit(rec: Reclamation): any {
    this.formEdit = new FormGroup({
      subject: new FormControl(rec.subject, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+)$')]),
      id: new FormControl(rec.id, []),
      etat: new FormControl(rec.etat, []),
      UserId: new FormControl(rec.UserId, []),
      description: new FormControl(rec.description, [Validators.required, Validators.minLength(8)]),
    });
  }
}
