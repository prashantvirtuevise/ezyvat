import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TokenResponse } from "../model/token-response.model";
import { PassportDetails } from "../model/passport-details.model";
import { AccountProfile } from "../model/account-profile.model";
import { ConfigurationService } from '../core/services/configuration.service';
import { BaseService } from '../core/services/base.service';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AccountService extends BaseService {
  public readonly baseApiUrl: string = `${environment.endPointApiSupplier}/Accounts/`;

  constructor(private http: HttpClient, private configService: ConfigurationService) {
    super('AccountService');
  }

  scanPassport(passport: PassportDetails): Promise<TokenResponse> {
    console.log(this.configService.getApiUrl.call(this) + "/scan");
    return this.http.post(this.configService.getApiUrl.call(this) + "/scan", passport).toPromise<any>();
  }

  getAccountProfile(memberId): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "GetAccountDetailById?memberId=" + memberId);
  }

  saveUserDetails(details): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "saveUserDetails", details);
  }
}
