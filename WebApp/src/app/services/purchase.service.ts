import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PurchaseSummary } from '../model/purchase-summary.model';
import { ICurrentPurchase } from '../model/current-purchases.model';
import { PurchaseDetails } from '../model/purchase-details.model';
import { Invoice } from '../model/invoice-details.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public readonly baseApiUrl: string = `${environment.endPointApiSupplier}/Purchase`;

  constructor(private http: HttpClient) { }

  getPurchase(id: string): Promise<PurchaseDetails> {

    return this.http.get(this.baseApiUrl + '/' + id).toPromise<any>();

  }

  // getPurchasesSummary(): Promise<PurchaseSummary> {

  //   return this.http.get(this.baseApiUrl + '/PurchaseSummary').toPromise<any>();

  // }

  getPurchasesSummary(memId): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "/PurchaseSummary?memberId=" + memId);
  }

   getPurchasesSummaryById(id): Observable<any> {
    id='4571C523-6870-45F7-A811-3368A430D4FC';
    return this.http.get<any>(this.baseApiUrl + "/PurchaseSummaryById?purchaseId=" + id);
  }

  getCurrentPurchases(): Promise<ICurrentPurchase> {

    return this.http.get(this.baseApiUrl + '/current').toPromise<any>();

  }

  getInvoiceItems(id: string): Promise<Invoice> {

    return this.http.get(this.baseApiUrl + '/invoice/' + id).toPromise<any>();

  }
  getPurchaseCount(userId): Observable<Invoice> {
    return this.http.get<any>(this.baseApiUrl + '/getPurchaseCount?userId=' + userId);

  }

  getPurchaseNewCount(userId): Observable<Invoice> {
    return this.http.get<any>(this.baseApiUrl + '/getPurchaseNewCount?userId=' + userId);

  }
}
