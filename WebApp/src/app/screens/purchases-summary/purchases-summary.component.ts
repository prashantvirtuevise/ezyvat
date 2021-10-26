import { Router } from "@angular/router";
import { PurchaseService } from "./../../services/purchase.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseSummary } from "src/app/model/purchase-summary.model";
import { Subscription } from "rxjs";
import { AppContextService } from "src/app/services/app-context.service";
import { MatDialog } from "@angular/material/dialog";
import { InfoMessageComponent } from "../info-message/info-message.component";
import { OopsMessageComponent } from 'src/app/screens/oops-message/oops-message.component';


@Component({
  selector: 'app-purchases-summary',
  templateUrl: './purchases-summary.component.html',
  styleUrls: ['./purchases-summary.component.scss']
})
export class PurchasesSummaryComponent implements OnInit {
  sumTotal='2000'
  sumVat='340'
  public model: PurchaseSummary = new PurchaseSummary();
  public subscriptionSignalEvent: Subscription;
  constructor(
    public appCtx: AppContextService,
    private dialog: MatDialog,
    private purchaseService: PurchaseService,
    private router: Router
    
  ) {}

  async ngOnInit() {
    if (sessionStorage.getItem("SessionData")!= null) {
    let logeddata = sessionStorage.getItem("SessionData");
    localStorage.setItem("islogedin",logeddata);
    }

   try{
     const memId='A25AF4CC-C286-4578-152A-08D7833A33D5'
     let data =  await this.purchaseService.getPurchasesSummary(memId).subscribe((data:any)=>{
      if(data.status==200){
        if(data.responseData)
        {}
        else{
            this.openOops()
        }
      }
      

    });
  }
  catch (error) {
    console.info(error);
  }
      
      this.model.Total=2000;
      this.model.VatReclaim=640;

    
  }


  openOops() {
    const dialogRef = this.dialog.open(OopsMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['home']);
    });
  }

  openInfo() {
    const dialogRef = this.dialog.open(InfoMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
