
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  Input
} from '@angular/core';

import {
  Subscription
} from 'rxjs';

import {
  MessagesService
} from 'src/app/shared/services/messages.service';
import {
  Router
} from '@angular/router';
import { ILanguageItem } from 'src/app/core/model/language.model';
/* import { LanguageHelperService } from 'src/app/core/services/language-helper.service'; */


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  IsShowMore: boolean = false;
  IsShowLanguages: boolean = false;
  showBackBtn: boolean = false;
  pageName: string;
  @ViewChild('backIcon', {
    static: false
  }) backIcon: ElementRef;

  public subscriptionAvatarImage: Subscription;
  public subscriptionNavIcon: Subscription;

  constructor(public router: Router, private messageService: MessagesService) { }

  ngOnInit() {
    this.pageName = this.router.url;
    this.subscribeToEvents();
  }

  onBackNavigation() {
    this.IsShowMore = false;
  }

  onShowMore() {
    this.IsShowMore = !this.IsShowMore;
  }



  private subscribeToEvents(): void {

    this.subscriptionNavIcon = this.messageService.getChangeRoute().subscribe((hidden: boolean) => {
      this.backIcon.nativeElement.hidden = hidden;
    });

  }

  navigate() {
    
    let page = window.location.href.split("/");
    let temp = page[3].split("?")
    let component = temp[0];
    let status = page[4];
    if(status)
    {
     status = JSON.parse(status); 
    }
    switch (component) {
      case "accountDetails":  
        if(!status){
          return this.router.navigateByUrl("scanPassport/false");
          break;
          }
          else
          this.router.navigateByUrl("/linksOptions");
          break;
      case "tripDetails":
        if(!status){
        this.router.navigateByUrl("/memberConnectionDetails/false");
        break;
        }
        else
        this.router.navigateByUrl("/linksOptions");
        break;
      case "addCreditCard":
        if(!status){
          this.router.navigateByUrl("/EazyPassComplete/false");
          break;
          }
          else
          this.router.navigateByUrl("/linksOptions");
          break;
      case "purchasesSummary":
        this.router.navigateByUrl("/addCreditCard/false");
        break;
      case "purchasesDetails":
        this.router.navigateByUrl("/purchasesSummary");
        break;
      case "AddInvoice":
        this.router.navigateByUrl("/purchasesDetails");
        break;
      case "pdfResult":
        this.router.navigateByUrl("/purchasesDetails");
        break;
      case "purchasesDetailsByItem":
        this.router.navigateByUrl("/purchasesDetails");
        break;
      case "noVATRefund":
        this.router.navigateByUrl("/purchasesDetails");
        break;
      case "EazyPassComplete":
        if(!status){
          this.router.navigateByUrl("/tripDetails/false")
          break;
          }
          else
          this.router.navigateByUrl("/linksOptions");
          break;
      case "memberConnectionDetails":
        if(!status){
          this.router.navigateByUrl("/accountDetails/false")
          break;
          }
          else
          this.router.navigateByUrl("/linksOptions");
          break;
      case "PaymentSummary":
        this.router.navigateByUrl("/linksOptions");
        break;
      case "info":     
        if(!status){
          this.router.navigateByUrl("/home");
          break;
          }
          else
          this.router.navigateByUrl("/purchasesSummary");
          break;
      case "EazyPassUpdate":
        this.router.navigateByUrl("/EazyPassComplete/true");
          break;
      case "scanPassport":
        if(!status){
          this.router.navigateByUrl("/welcomeToEazyvat")
          break;
          }
          else
          this.router.navigateByUrl("/linksOptions");
          break;
      default:
          return this.router.navigateByUrl("/home");
          break;
    }
  }
}
