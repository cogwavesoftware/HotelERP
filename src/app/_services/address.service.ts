
import { Injectable } from '@angular/core';

import { Addressmodel } from './../_models/Addressmodel';
import { Observable, Subject, observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

 public  datal:Observable<any>
  private subject = new Subject<any>();

  constructor() { }

  SetMessages(dataly) {
  
    
    this.subject.next(dataly);
}

clearMessages() {
    this.subject.next();
}

getMessage(): Observable<any> {
  alert('r')
    return this.subject.asObservable();
}


getSales() {
  return of({
    "year1": {
      "volumeSales": "0.09",
      "valueSales": "1.23"
    },
    "year2": {
      "volumeSales": "0.11",
      "valueSales": "1.56"
    },
    "year3": {
      "volumeSales": "0.12",
      "valueSales": "1.69"
    },
    "year4": {
      "volumeSales": "0.12",
      "valueSales": "1.64"
    },
    "year5": {
      "volumeSales": "0.10",
      "valueSales": "1.41"
    },
    "total": {
      "volumeSales": "0.55",
      "valueSales": "7.53"
    }
  });
}
 
}
