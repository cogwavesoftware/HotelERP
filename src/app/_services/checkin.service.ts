
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
export class CheckinService {
  constructor(private http: HttpClient) { }

  SaveCheckinData(checkin: any) {
    return this.http.post(environment.apiURL + '/api/CloudHMS/checkin/Savecheckin', checkin, { headers: environment.BASE_CONTENTTYPE_HEADER })
  }

 GetCheckinDetail(RoomNo:string,Branchcode:string) {   
    return this.http.get(environment.apiURL + '/api/CloudHMS/checkin/GetCheckinDetails?BranchCode=' + Branchcode + '&RoomNo=' + RoomNo);
    
  }
  GetCheckinDetailList(RoomNo:any,Branchcode:string) {   
    return this.http.get(environment.apiURL + '/api/CloudHMS/checkin/GetCheckinDetailsList?RoomNo=' + RoomNo + '&Branchcode=' + Branchcode);
    
  }

  GetReservationBookingDetails(RoomNo:string,RoomCode:string,Branchcode:string,ReservationNo:string)
  {
    return this.http.get(environment.apiURL + '/api/CloudHMS/checkin/GetResDetail?RoomNo=' + RoomNo + '&RoomCode=' + RoomCode + '&Branchcode=' + Branchcode + '&ReservationNo=' + ReservationNo);
  }

}
