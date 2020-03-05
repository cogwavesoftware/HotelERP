import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  //private messagesource=new BehaviorSubject('expanded');

  private Indexsoucre=new BehaviorSubject(0);

  //currentMessage =this.messagesource.asObservable();
  currentindex=this.Indexsoucre.asObservable();

  constructor(private http: HttpClient) { }
  //GetBankdetails("CW_1001");
  getBankList() {

    return this.http.get(environment.apiURL + 'api/CloudHMS/Master/GetBankdetails?BranchCode=' + 'CW_1001');
  }

  // changeMessage(message: string) {
  //   this.messagesource.next(message)
  // }

  changeindexvalue(currentindex: number) {
    this.Indexsoucre.next(currentindex)
  }
}
