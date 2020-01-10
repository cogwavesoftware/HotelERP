import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  postBankAccount(formData) {
    return this.http.post(environment.apiURL + '/BankAccount', formData);
  }

  putBankAccount(formData) {
    return this.http.put(environment.apiURL + '/BankAccount/' + formData.bankAccountID, formData);
  }

  deleteBankAccount(id) {
    return this.http.delete(environment.apiURL + '/BankAccount/' + id);
  }

  getBankAccountList() {
    return this.http.get(environment.apiURL + '/BankAccount');
  }
}
