import { AccountService } from "src/app/services/account.service";
import { Component, OnInit } from "@angular/core";
import { AccountProfile } from "src/app/model/account-profile.model";
import { Router, ActivatedRoute } from '@angular/router';

import { LanguageHelperService } from "src/app/core/services/language-helper.service";
import { ILanguageItem } from "src/app/core/model/language.model";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  status: boolean;
  nextPage: string;
  public model: AccountProfile = new AccountProfile();

  constructor(
    private router: Router,
    private accountService: AccountService,
    public languageHelperService: LanguageHelperService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    try {      
      let memId = "A25AF4CC-C286-4578-152A-08D7833A33D5";
      await this.accountService.getAccountProfile(memId).subscribe((data: any) => {
        
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.model.FirstName = result.firstName;
          this.model.LastName = result.lastName;
          this.model.Nationality = result.nationality;
          this.model.PassportNumber = result.passportNumber;
          this.model.BirthDate = result.birthDate;
          this.model.IssueDate = result.issueDate;
          this.model.ExpiredOn = result.expiredOn;
          localStorage.setItem("firstname",result.firstName)
        }
      });

    } catch (error) {
      console.info(error);
    }
    try {
      ;
      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);
      if (this.status == false)  //manage status
        this.nextPage = 'EazyPassComplete';
      else
        this.nextPage = 'memberConnectionDetails'
    } catch (error) {
      console.info(error);
    }
  }

  async onClickSaveAccountDetails(){
  /*   try{
      
      if (this.model.PassportNumber != undefined && this.model.PassportNumber.toString().length > 0
      && this.model.Nationality != undefined && this.model.Nationality.toString().length > 0
      && this.model.LastName != undefined && this.model.LastName.toString().length > 0
      && this.model.FirstName != undefined && this.model.FirstName.toString().length > 0
      && this.model.ExpiredOn != undefined && this.model.ExpiredOn.toString().length > 0
      && this.model.BirthDate != undefined && this.model.ExpiredOn.toString().length > 0
      && this.model.IssueDate != undefined && this.model.IssueDate.toString().length > 0
      )
      {
        this.model.PassportNumber="123456789"
        this.model.FirstName="racheliTest1"
        const details =this.model           
        await this.accountService.saveUserDetails(details).subscribe((data:any)=>{
          ;
          if(data.statusCode==200){
            ;    
              this.router.navigateByUrl(`/${this.nextPage}/${this.status}`);                
          }   
        });
      }  
      else
      {
        alert("please fill all the field")
      }   
    } catch (error) {
      console.info(error);
    } */
    ;
    this.router.navigateByUrl(`/${this.nextPage}/${this.status}`); 
  }

  goToScanPass() {
    this.router.navigateByUrl(`/scanPassport/true`);
  }

  
  /*  public setLanguage(lang: ILanguageItem) {
     this.languageHelperService.setLanguage(lang);
   } */

}
