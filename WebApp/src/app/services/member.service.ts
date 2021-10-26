import { Visit } from './../model/trip-details.model';
import { Shop } from 'src/app/model/shop.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonalDetails } from '../model/member-details.model';
import { PassportDetails } from '../model/passport-details.model';
import { BaseService } from '../core/services/base.service';
import { ConfigurationService } from '../core/services/configuration.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
  public readonly baseApiUrl: string = `${environment.endPointApiSupplier}/Accounts/`;

  constructor(private http: HttpClient, private configService: ConfigurationService) {
    super('MemberService');
  }

  updatePersonalDetails(data): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "updatePersonalDetails", data);
  }

  updateVisitDetails(model: Visit): Promise<any> {
    return this.http.post(this.configService.getApiUrl.call(this) + '/visit', model).toPromise<any>();
  }

  getVisitDetails(): Observable<any> {
    return this.http.get(this.baseApiUrl + 'getVisitInfo');
  }

  getPersonalDetails(memberId): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "GetPersonalDetailById?memberId=" + memberId);
  }

  getPassportDetails(): Promise<PassportDetails> {
    // let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDbGFpbUlkIjoiYTI1YWY0Y2MtYzI4Ni00NTc4LTE1MmEtMDhkNzgzM2EzM2Q1IiwiZXhwIjoxNjI4MDk2NzU2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNjMyIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTYzMiJ9.CJBUsZ7gGuLc6xSes5I8rv3w68ugsqAMcgrCXn9ko6A');
    //,{ 'headers': headers }
    return this.http.get(this.configService.getApiUrl.call(this) + '/passport').toPromise<any>();
  }

  getShopsVatDetails(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'getShopsVatInfo');
  }

  getMemberVisitInfo(memberId): Promise<any> {
    return this.http.get(this.configService.getApiUrl.call(this) + `/visit/${memberId}`).toPromise<any>();
  }
}
