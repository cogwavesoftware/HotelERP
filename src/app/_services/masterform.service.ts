import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/catch';
import { Alert } from 'selenium-webdriver';
import { stringify } from '@angular/compiler/src/util';
import { Floormodel } from './../_models/floormodel';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterformService {

  constructor(private http: HttpClient) { }


  GetBankdetails(branchcode:string)
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/GetBankdetails?BranchCode=' + branchcode);
     
  }

  getreferencedetail(branchcode:string)
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Getreference?BranchCode=' + branchcode);
     
  }
  getplan()
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Plan');
     
  }
  getwalet()
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/walet');  
  }
  getothertax(branchcode:string)
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/othertax?BranchCode=' + branchcode);  
  }
  
  getplanbyid(branchcode:string,plan:number)
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/planbyId?BranchCode=' + branchcode + '&PlanId=' + plan);  
  }
   
  getallplanopr(branchcode:string)
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/planopr?BranchCode=' + branchcode);  
  }

     
  getledger(branchcode:string)
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/ledger?BranchCode=' + branchcode);  
  }
  
  
}
