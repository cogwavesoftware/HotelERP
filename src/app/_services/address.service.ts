
import { Injectable } from '@angular/core';

import { Addressmodel } from './../_models/Addressmodel';
import { Observable, Subject, observable } from 'rxjs';

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
 
}
