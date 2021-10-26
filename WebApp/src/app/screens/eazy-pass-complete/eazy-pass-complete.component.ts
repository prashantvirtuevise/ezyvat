import { Component, Input, OnInit } from '@angular/core';
import { PassportDetails } from 'src/app/model/passport-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from "src/app/services/account.service";
import { AccountProfile } from "src/app/model/account-profile.model";
import {HomenavControlService} from '../../services/homenav-control.service';


@Component({
  selector: 'app-eazy-pass-complete',
  templateUrl: './eazy-pass-complete.component.html',
  styleUrls: ['./eazy-pass-complete.component.scss']
})
export class EazyPassCompleteComponent implements OnInit {
  status: boolean;
  statusUpdate: boolean = false;
  memberName = 'Nitzan';
  nextPage: string;
  // name:string;
  public model: AccountProfile = new AccountProfile();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
   private link:HomenavControlService

  ) { }
  async ngOnInit() {
    try {
      let memId = "A25AF4CC-C286-4578-152A-08D7833A33D5";
      await this.accountService.getAccountProfile(memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          // this.model.FirstName = result.firstName;
          // this.model.LastName = result.lastName;
          // this.model.Nationality = result.nationality;
          // this.model.PassportNumber = result.passportNumber;
          this.model.BirthDate = result.birthDate;
          this.model.IssueDate = result.issueDate;
          this.model.ExpiredOn = result.expiredOn;
        }
      });
      this.model.FirstName = 'NITZAN'
      this.model.LastName = 'MEIRAV'
      this.model.PassportNumber = '22794551'
      this.model.Nationality = "Israel";
      // localStorage.setItem('name',this.model.FirstName);
      // console.log(localStorage.getItem("name"));
    }
     catch (error) {
      console.info(error);
    }
    try {
      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);
      if (this.status == true)  //manage status
      {
        this.nextPage = 'scanPassport';      
      }
      else
        this.nextPage = 'addCreditCard';

    } catch (error) {
      console.info(error);
    }
  }
  goToScanPass() {
    this.router.navigateByUrl("/scanPassport/true");
  }
}
