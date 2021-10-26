import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-pdf-result',
  templateUrl: './pdf-result.component.html',
  styleUrls: ['./pdf-result.component.scss']
})
export class PdfResultComponent implements OnInit {
  purchaseData: any;
  constructor(private purchaseService: PurchaseService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getPdfData();
  }
  getPdfData() {
    const purchaseId = this.route.snapshot.queryParams['Id'];
    let resData = this.purchaseService.getPurchasesSummaryById(purchaseId).subscribe((data: any) => {
      ;
      if (data.status == 200) {
        this.purchaseData = data.responseData;
        const { invoiceImage } = this.purchaseData;
        const byteArray = new Uint8Array(atob(invoiceImage).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        document.getElementById("pdfDiv").innerHTML=`<object type="text/html" data="${url}#toolbar=0" style="height: 100%;"></object>`;
      }
      console.info(this.purchaseData);
    });

  }
  goToPurchaseDet() {
    const purchaseId = this.route.snapshot.queryParams['Id'];
    this.router.navigateByUrl(`/purchasesDetails?id=${purchaseId}`);
  }
}
