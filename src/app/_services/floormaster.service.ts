
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
export class FloormasterService {
 
  floorformmodel:Floormodel;

  constructor(private http: HttpClient) { }



  GetfloorData()
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Getfloor');
     
  }
  
   SavefloorData(company:any)
   {
     
     return this.http.post(environment.apiURL + '/api/CloudHMS/Master/Savefloor',company,{ headers:environment.BASE_CONTENTTYPE_HEADER })
     
   }
  
}
