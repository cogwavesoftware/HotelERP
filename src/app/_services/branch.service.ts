
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Branchmodel, productlist } from '../_models/Branchmodel';
import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/catch';

import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  formData: Branchmodel;
  productlist: productlist[];

  constructor(private http: HttpClient) { }



  getBranchdata()
  {  
    return this.http.get<any>(environment.apiURL + '/api/common/HMSBranch/Getbranch');  
  }
  
 getPorductByBranchcode(Branchcode) :Observable<any>
 {
  return this.http.get<any>(environment.apiURL + '/api/common/HMSBranch/Getbranch?Branchcode=' + Branchcode);  
 }

  GetCogwaveproduct() : Observable<any>
  {  
    return this.http.get<any>(environment.apiURL + '/api/common/HMSBranch/Getcogwaveproduct');  
  }



   SaveBranchData(Branchmodel:any)
   {
     
     return this.http.post(environment.apiURL + '/api/common/HMSBranch/Savebranch',Branchmodel,{ headers:environment.BASE_CONTENTTYPE_HEADER })
     .pipe(map(res=>
      {
        return res;
      }));
   }
  
}
