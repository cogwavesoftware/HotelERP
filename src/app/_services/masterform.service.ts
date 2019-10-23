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


  GetBankdetails()
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/GetBankdetails');
     
  }

  getreferencedetail()
  {  
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Getreference');
     
  }
  
}
