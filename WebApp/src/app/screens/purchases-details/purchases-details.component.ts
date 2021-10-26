import { PurchaseDetails } from 'src/app/model/purchase-details.model';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-purchases-details',
  templateUrl: './purchases-details.component.html',
  styleUrls: ['./purchases-details.component.scss']
})
export class PurchasesDetailsComponent implements OnInit {
  isShowInvoiceImg: boolean = true;
  isShowStatusApprove: boolean = true;
  isShowStatusNoRefund: boolean = true;
  purchaseData: any;

  public model: PurchaseDetails = new PurchaseDetails();
    constructor(private spinner: SpinnerVisibilityService,private purchaseService: PurchaseService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
   // ;
    this.spinner.show();
    try { 
         const purchaseId = this.route.snapshot.queryParams['Id'];
         await this.purchaseService.getPurchasesSummaryById(purchaseId).subscribe((data: any) => {
         if (data.status == 200) {
         this.purchaseData = data.responseData;
        }   
    });
    } catch (error) {
      console.info(error);
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  // getPurchaseDetailsById() {
    
  // }

  goToSummary() {
    this.router.navigateByUrl('/purchasesSummary');
  }
  /*  async ngOnInit() {
 
     try {
       const purchaseId = this.route.snapshot.paramMap.get('id');
 
       this.model = await this.purchaseService.getPurchase(purchaseId);
 
     } catch (error) {
       console.info(error);
     }
   } */

  onSelectInvoice() {

    this.router.navigate(['/invoice-details/' + this.model.Id]);

  }

  goToPdf() {
    const purchaseId = this.route.snapshot.queryParams['Id'];
    this.router.navigateByUrl(`/pdfResult?Id=${purchaseId}`);
  }
}

