import { Component, createPlatform, ViewChild, OnInit,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { SuccessMessageComponent } from '../success-message/success-message.component';

@Component({
  selector: 'app-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.scss']
})
export class AddCreditCardComponent implements OnInit {
 /*  @ViewChild('ExpiryDate', { static: false }) ExpiryDate: ElementRef<HTMLInputElement>;  */
  ExpiryDate:string='dddd';
  /* isShowNewProfile:boolean=true;  */
  status: any;
  cardForm: FormGroup;
  isDisabled: boolean=true;
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder,private _paymentService: PaymentService) { }

  

  openSuccess() {
    const dialogRef = this.dialog.open(SuccessMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
    this.router.navigate(['purchasesSummary']);
    alert("OK you are logged in");
    });
  }


  changeSlash(val,e){
   
    if (val==2)
   {
     
    
   }
   else{
   
   } 

  }
  

  goToeazyPass() {
    this.router.navigateByUrl('/EazyPassComplete/false');
  }
  async ngOnInit() {
    try {
      
      const status = this.route.snapshot.paramMap.get('status');
      /* this.isShowNewProfile=JSON.parse(status); */
      this.status = JSON.parse(status);

    } catch (error) {
      console.error(error);
    }
    this.createPlatform();
  }
  createPlatform() {
    this.cardForm = this.fb.group({
      CardNumber: [''],
      ExpiryDate: [''],
      CVV: ['']
    });
  }
  get formControls() { return this.cardForm.controls; }
  SubmitData() {
    if (this.cardForm.valid) {
      let expiry = this.cardForm.value.ExpiryDate.split("/");
      let data = {
        CardNumber: this.cardForm.value.CardNumber,
        ExpiryYear: expiry[1],
        ExpiryMonth: expiry[0],
        UserId: "910FD9F1-1B66-4650-A229-08D8DC218ABA",
        CVV: this.cardForm.value.CVV,
      }
    this._paymentService.addUserCard(data).subscribe((data: any) => {
      if(data.statusCode== 200){
        // this.openSuccess();
        sessionStorage.setItem("token","sfrhgbe\fgxsgbffshbcvcdshcgbjsgcnxbcgxbehegfnc,ncbhfcxjhcbcbbvncbdncbxcbnbdcxhnvcbcxbbcxncbcxvbbngvnbbgnfcdc");
        sessionStorage.setItem("UserName",data.responseData);
      } else {
        // Show Error
      }
      // NOTE: This is temp
      this.openSuccess();
      
    });
    } else {
      console.error("please fill out all the fields");
    }
  }
  onShowPaymentDetails() {
    sessionStorage.setItem('SessionData','Qfswtt235ARdswWVsxX6q95aqWfccXyOprst');
    // Opens popup for payment success/error
    this.openSuccess();
    // this.router.navigate(['PaymentSummary']);
  }

  onSaveUpdatePayment(){
    //goto servise
    sessionStorage.setItem('SessionData','Qfswtt235ARdswWVsxX6q95aqWfccXyOprst');
    this.router.navigateByUrl("/linksOptions");

  }
  savesession(){
    sessionStorage.setItem('SessionData','Qfswtt235ARdswWVsxX6q95aqWfccXyOprst');
    alert("OK you are logged in")
  }
}


