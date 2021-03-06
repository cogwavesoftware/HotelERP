
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
   //return this.http.get(`assets/data/branch.json`);
    return this.http.get<any>(environment.apiURL + '/api/common/HMSBranch/Getbranch');  
  }
  //+ '&password=' + password
 getPorductByBranchcode(Branchcode,Id)
 {
  return this.http.get(environment.apiURL + '/api/common/HMSBranch/Getbranch?Branchcode=' + Branchcode + '&Id=' +Id);  
 }

  GetCogwaveproduct() : Observable<any>
  {  
    return this.http.get<any>(environment.apiURL + '/api/common/HMSBranch/Getcogwaveproduct');  
  }
  Getproduct(Branchcode) : Observable<any>
  {  
    return this.http.get<any>(environment.apiURL + '/api/common/HMSBranch/Getproduct?Branchcode=' + Branchcode);  
  }



   SaveBranchData(Branchmodel:any)
   {    
     return this.http.post(environment.apiURL + '/api/common/HMSBranch/Savebranch',Branchmodel,{ headers:environment.BASE_CONTENTTYPE_HEADER })
     .pipe(map(res=>
      {
        return res;
      }));
   }


   
  GetAllBillHeader()
  {  
   
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/GetBillHeader');  
  }
  
  SaveSoftwaretoolSetup(tool:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/Posttool',tool,{ headers:environment.BASE_CONTENTTYPE_HEADER })
     .pipe(map(res=>
      {
        return res;
      }));
  }

}
