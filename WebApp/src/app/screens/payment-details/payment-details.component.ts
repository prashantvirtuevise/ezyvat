import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  LastfourDigits = '7658'
  ExpirationDate = '04/26'
  cardData: any = [];
  constructor(private _paymentService: PaymentService) { }

  ngOnInit() {
    this.getSavedCards();
  }
  getSavedCards() {
    let userId = "910FD9F1-1B66-4650-A229-08D8DC218ABA";
    // let userId = sessionStorage.getItem("UserId");
    this._paymentService.getUserSavedCards(userId).subscribe((data: any) => {
      if (data.length > 0) {
        data.forEach(element => {
          let maskedNumber = element.cardNumber;
          let data = {
            cardNumber: element.cardNumber,
            expiryMonth: element.expiryMonth,
            expiryYear: element.expiryYear,
            userId: element.userId,
            id: element.id,
            masked: maskedNumber.replace(/\d(?=\d{4})/g, "*")
          };
          this.cardData.push(data);
        });
      } else {
        console.info("No cards Found. Please Add One");
      }
    });
  }
}
