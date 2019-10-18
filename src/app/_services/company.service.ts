
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../_models/user'
import { loginMaster } from '../_models/loginMaster';
import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/catch';
import { Alert } from 'selenium-webdriver';
import { stringify } from '@angular/compiler/src/util';
import { SuperAdmin } from '../_models/SuperAdmin';
import { Menus } from 'src/app/_models/Menu';
import { throwError } from 'rxjs';
import { companymodel } from '../_models/companymodel';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  formData: companymodel;
  

  constructor(private http: HttpClient) { }

  getcompanydata()
  {  
    return this.http.get<any>(environment.apiURL + '/api/common/HMSCompany/Getcompany');
     
  }
  
   SaveCompanyData(companymodel:any)
   {

     
    console.log(companymodel)
     return this.http.post(environment.apiURL + '/api/common/HMSCompany/Savecompany',companymodel,{ headers:environment.BASE_CONTENTTYPE_HEADER })
     .pipe(map(res=>
      {
        return res;
      }));
   }
  

 
  errorHandler(error: HttpErrorResponse)
  {
   return Observable.throw(error.message || "server ERROR");
  }

  handleerror(err)
  {
    if(err instanceof HttpErrorResponse)
    {
        //server seide
    }
    else
    {
        //Clientside
    }
    return throwError(err);
  }

}
