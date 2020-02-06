
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs/observable";
import { Availabilitymodel } from './../_models/Availabilitymodel';
import { HMSReservationFormmodel } from './../_models/HMSReservationFormmodel';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {

   }
   GetAvailability(date:string,todate:string) 
   {
     
      
      return this.http.get<Availabilitymodel>(environment.apiURL + '/api/CloudHMS/reservation/availability?date=' + date + '&todate=' + todate);
      
   }


   GetBookingData(ReservationModel:any)
   {
    return this.http.post<HMSReservationFormmodel>(environment.apiURL + '/api/CloudHMS/reservation/bookings',ReservationModel,{ headers:environment.BASE_CONTENTTYPE_HEADER })
   }

   EditsingleBookingDetails(ReservationModel:any)
   {
    return this.http.post<HMSReservationFormmodel>(environment.apiURL + '/api/CloudHMS/reservation/Editbookings',ReservationModel,{ headers:environment.BASE_CONTENTTYPE_HEADER })
   }

}
