import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }
  //GetBankdetails("CW_1001");
  getBankList() {

    return this.http.get(environment.apiURL + 'api/CloudHMS/Master/GetBankdetails?BranchCode=' + 'CW_1001');
  }
}
