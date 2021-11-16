import { Visit } from 'src/app/model/trip-details.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})

export class TripDetailsComponent implements OnInit {
  areas: any = [];
  allInterest: any = [];
  cities: any = [];
  excludedCities: any = [];
  visitPurpose: any = [];
  isDisabled: boolean = true;
  public model: Visit = new Visit();

  myplaceHolder: string = 'Select';
  status: boolean;
  isChecked: boolean = false;
  todayDate: Date = new Date();
  constructor(private memberService: MemberService, private router: Router, private route: ActivatedRoute,) { }

  checkPlaceHolder(val) {
    if (this.myplaceHolder) {
      this.myplaceHolder = null
      return;
    } else {
      this.myplaceHolder = 'Select'
      return
    }
  }

  goToAccounts() {
    this.router.navigateByUrl(`/accountDetails/true`);
  }

  async ngOnInit() {
    try {
      const memberId = "A25AF4CC-C286-4578-152A-08D7833A33D5";
      this.model.MemberId = memberId;
      await this.memberService.getVisitDetails().subscribe((data: any) => {
        const { responseData } = data.result;
        const { areas } = responseData;
        const { cities } = responseData;
        const { interest } = responseData;
        const { purpose } = responseData;
        this.areas = areas;
        this.cities = cities;
        this.allInterest = interest;
        this.visitPurpose = purpose;
     
        this.memberService.getMemberVisitInfo(memberId).then((data) => {
        if (data) {
          this.model.EndDate = data.EndDate;
          this.model.InterestId = data.InterestId;
          this.model.PurposeId = data.PurposeId;
          this.model.AreaId = data.AreaId;
          this.OnAreaChange(data.AreaId);
          this.model.CityId = data.CityId;
          this.isDisabled = false;
        }
      }); });
    } catch (error) {
      console.error(error);
    }
    try {

      const status = this.route.snapshot.paramMap.get('status');
      this.status = JSON.parse(status);
    } catch (error) {
      console.error(error);
    }
  }

  OnAreaChange(areaId) {
    this.excludedCities = [];
    areaId.forEach(x => {
      const areaCities = this.cities.filter(t => t.areaId == x);
      this.excludedCities.push(...areaCities)
    });
    this.OnChangeTripDetails();
  }

  OnChangeTripDetails() {
    let data = this.model;
    if (data.AreaId != undefined && data.AreaId.length > 0
      && data.InterestId != undefined && data.InterestId.length > 0
      && data.CityId != undefined && data.CityId.length > 0
      && data.PurposeId != undefined && data.PurposeId.toString().length > 0
      && data.EndDate
    ) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

  checked() {
    this.isChecked = !this.isChecked;
  }

  continue() {
    let data = this.model;
    if (data.EndDate == undefined) {
      return alert("Please tell us upto which day you will be here?");
    }
    if (data.PurposeId == undefined) {
      return alert("Please tell us your purpose?");
    }
    if (data.AreaId == undefined) {
      return alert("Please tell us in which area you will stay?");
    }
    if (data.CityId == undefined) {
      return alert("Please tell us in which city you will stay?");
    }
    if (data.InterestId == undefined) {
      return alert("Please tell us what is thing which you'll most likely to buy?");
    }
    this.router.navigateByUrl(`/EazyPassComplete/${this.status}`);
  }
  async updateTripDetails() {
    //goToService
    await this.memberService.updateVisitDetails(this.model).then((data) => {
      if (data) {
        this.router.navigateByUrl("/linksOptions");
      }
    });
  }
}
