import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseDetails } from 'src/app/model/purchase-details.model';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-one-purchase',
  templateUrl: './one-purchase.component.html',
  styleUrls: ['./one-purchase.component.scss']
})
export class OnePurchaseComponent implements OnInit {
  isShowNewRed:boolean=false;
  public model: PurchaseDetails = new PurchaseDetails();
  purchaseSum: any = [];

  constructor(private purchaseService: PurchaseService,private router: Router) { }

  async ngOnInit() {
    let memId="910FD9F1-1B66-4650-A229-08D8DC218ABA";
      let data =  await this.purchaseService.getPurchasesSummary(memId).subscribe((data:any)=>{
        if(data.status==200){
          // this.purchaseSum = data.responseData;
          let i=0;
          data.responseData.forEach(element => {
            let newData = element;
            if(i==0) {
              newData.img = "../../assets/icons/zara.png";
            }
            if(i==1) {
              newData.img = "../../assets/icons/swan.png";
            }
            this.purchaseSum.push(newData);
            i++;
          });
        }
      });
    this.model.ShopName='ZARA';
    this.model.DatePurchase=new Date('01/01/21')
    this.model.Sum=2000;
    this.model.VatReclaim=340;
  }
  goToDet(purchaseId) {
		this.router.navigate(['/purchasesDetails'], { queryParams: { Id: purchaseId } });

  }
}
