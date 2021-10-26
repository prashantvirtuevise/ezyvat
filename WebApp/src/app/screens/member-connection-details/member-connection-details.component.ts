import { Component, Input, OnInit } from '@angular/core';
import { MemberService } from './../../services/member.service';
import { PersonalDetails } from 'src/app/model/member-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-connection-details',
  templateUrl: './member-connection-details.component.html',
  styleUrls: ['./member-connection-details.component.scss']
})
export class MemberConnectionDetailsComponent implements OnInit {
  memId: string = "";
  status: boolean;
  public model: PersonalDetails = new PersonalDetails();
  // email = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]); 

  constructor(private router: Router, private route: ActivatedRoute, private memberService: MemberService) { }

  async ngOnInit() {
    try {
      // this.model = await this.memberService.getPersonalDetails();
      this.memId = "A25AF4CC-C286-4578-152A-08D7833A33D5";
      await this.memberService.getPersonalDetails(this.memId).subscribe((data: any) => {
        if (data.statusCode == 200) {
          const { result } = data.responseData;
          this.model.Email = result.email;
          this.model.MobileNumber = result.mobileNumber;
          this.model.RegionMobileNumber = result.regionMobileNumber;
        }
      });
    } catch (error) {
      console.info(error);
    }
    try {
      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);

    } catch (error) {
      console.info(error);
    }
  }
  goToEazyPass() {
    this.router.navigateByUrl("/EazyPassComplete/false");
  }
  updateName() {
    console.info(this.model);
    let data = {
      Email: this.model.Email,
      MobileNumber: this.model.MobileNumber,
      MemberId: this.memId
    }
    this.memberService.updatePersonalDetails(data).subscribe((data: any) => {
      if (data.statusCode == 200) {
        this.router.navigateByUrl(`/tripDetails/${this.status}`);
      } else {
        console.info(data.message);
      }
    })
  }
}
