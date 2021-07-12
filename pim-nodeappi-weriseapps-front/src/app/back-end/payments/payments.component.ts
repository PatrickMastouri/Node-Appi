import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/Domain/Model/payment';
import { PaymentService } from 'src/app/Domain/Services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  PaymentList: Payment[];
  Payment: Payment;
  constructor(private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment(){
    this.paymentService.getPayment().subscribe(
      data=>this.PaymentList= data.data
    ),
      error => {
        console.log(error);
      }

  }

}
