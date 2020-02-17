
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs/observable";
import { Availabilitymodel } from './../_models/Availabilitymodel';
import { HMSReservationFormmodel } from './../_models/HMSReservationFormmodel';
import {  BookingListmodel } from './../_models/BookingListmodel';

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

   SaveReservationData(ResData: any) {
    return this.http.post(environment.apiURL + '/api/CloudHMS/reservation/savebookings', ResData, { headers: environment.BASE_CONTENTTYPE_HEADER })
  }

  
  GetBookingList(BranchCode:string)
  {
   return this.http.get<any>(environment.apiURL + '/api/CloudHMS/reservation/bookingslist?BranchCode=' + BranchCode)
  }

  FilterBookingListViaCompanyName(BranchCode:string,CompanyName:string)
  {
   return this.http.get<any>(environment.apiURL + '/api/CloudHMS/reservation/bookingslistviacompany?BranchCode=' + BranchCode + '&CompanyName=' + CompanyName);
  }

  FilterBookingListAllsearch(BranchCode:string,search:string)
  {
   return this.http.get<any>(environment.apiURL + '/api/CloudHMS/reservation/bookingslistallsearch?BranchCode=' + BranchCode + '&search=' + search);
  }

  GetBookingDetailViaRes(BranchCode:string,BookingNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/reservation/GetBookingViaResNo?BranchCode=' + BranchCode + '&BookingNo=' + BookingNo);
  }


}
