import { Invoice } from './../../model/invoice-details.model';
import { InvoiceItem } from './../../model/invoice-details.model';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  ItemNumber='1'
  
  public model: Invoice = new Invoice();
  public item: InvoiceItem=new InvoiceItem();
  constructor(private purchaseService: PurchaseService, private route: ActivatedRoute) { }

  async ngOnInit() {

    try {
      const purchaseId = this.route.snapshot.paramMap.get('id');
      this.model = await this.purchaseService.getInvoiceItems(purchaseId);
      this.item.Description="";
      this.item.Price=22;
      this.item.Quantity=66;
      this.item.SerialNumber="99";
      this.item.Total=1000;
    


    } catch (error) {
      console.info(error);
    }
  }

}
