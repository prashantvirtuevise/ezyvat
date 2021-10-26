import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OopsMessageComponent } from 'src/app/screens/oops-message/oops-message.component';
import { HomenavControlService } from 'src/app/services/homenav-control.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-launch-menu',
  templateUrl: './launch-menu.component.html',
  styleUrls: ['./launch-menu.component.scss']
})
export class LaunchMenuComponent implements OnInit {

  isShowNewPurchases: boolean = false;
  countNewPurchases: number;
  constructor(private purchaseService: PurchaseService,private router: Router, public dialog: MatDialog, public user: HomenavControlService) { }

  onClickHome() {
    this.iconStandart()
    this.user.isShowIconHomeBold = !this.user.isShowIconHomeBold;
    this.router.navigate(['home']);
  }
  onClickPurchases() {
    this.iconStandart()
    this.user.isShowIconPurBold = !this.user.isShowIconPurBold;
    this.cheackStatusPurchases()
    if (localStorage.getItem("islogedin")!= null) {
      this.router.navigateByUrl("purchasesSummary");      
    } else {
      this.router.navigateByUrl("welcomeToEazyvat");
    }
  }
  openOops() {
    const dialogRef = this.dialog.open(OopsMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onClickShop() {
    this.iconStandart()
    this.user.isShowIconShopBold = !this.user.isShowIconShopBold;
    this.router.navigate(['maps']); 
     /* this.router.navigate(['tripDetails/:true']);  */
    

  }
  onClickProfil() {
    this.iconStandart()
    this.user.isShowIconProBold = !this.user.isShowIconProBold;
    // this.router.navigate(['linksOptions']);
    if (localStorage.getItem("islogedin")!= null) {
      this.router.navigateByUrl("linksOptions");      
    } else {
      this.router.navigateByUrl("welcomeToEazyvat");
    }
  }
  iconStandart() {
    this.user.isShowIconHomeBold = false;
    this.user.isShowIconPurBold = false;
    this.user.isShowIconShopBold = false;
    this.user.isShowIconProBold = false;
  }

  ngOnInit(): void {
  ;
  this.checkNewPurchases()
  }

  cheackStatusPurchases()
  {     
    const token = sessionStorage.getItem("token");
/*     let userId = "910FD9F1-1B66-4650-A229-08D8DC218ABA"; */
    let userId = undefined
    if (userId) //if token? or if userId?
    {  //If a user is registered:
        this.purchaseService.getPurchaseCount(userId).subscribe((data:any)=>{
        if(data.status == 200) 
        {
           
           if(data.responseData>0) //If a user is registered with purchases
            {
            this.router.navigate(['purchasesSummary']);
            }
            else //If a user is registered with not purchases
            {
              
              this.openOops();
            }
        }
      }); 
      
    }
   
    else { //If a user is not registered:   
      this.router.navigate(['welcomeToEazyvat']);
    }
  }

  checkNewPurchases()
  {
    const token = sessionStorage.getItem("token");
    let userId = "910FD9F1-1B66-4650-A229-08D8DC218ABA";
    if (userId) //if token? or if userId?
    {  //If a user is registered:
        this.purchaseService.getPurchaseNewCount(userId).subscribe((data:any)=>{
        if(data.status == 200) 
        {
           
           if(data.responseData>0) 
            {
              this.countNewPurchases=data.responseData
              this.isShowNewPurchases=true
            }
            else 
            {
              this.isShowNewPurchases=false
            }
        }
      }); 
      
    }
  }

}
