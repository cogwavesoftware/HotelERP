import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { BookingRegister_Read_spParams, tblBookingMaster } from './BookingParams.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class bookingService {formData: BookingRegister_Read_spParams;bookingData: tblBookingMaster;
  constructor(private http: HttpClient)
   {
    this.formData = new BookingRegister_Read_spParams();
    this.bookingData = new tblBookingMaster();
  }

  refreshList() { }

  getbookingListParams() {
    var body = {
      ...this.formData,
    };
    return this.http.post(environment.apiURL + '/booking', body).toPromise();
  }


  statusList() {
    // return this.http.get(environment.apiURL + '/booking/GetStatusList');
    return this.http.get(environment.apiURL + '/booking/GetStatusList').toPromise();
  }

  bookingtypeList() {
    return this.http.get(environment.apiURL + '/booking/GetBookingTypeList').toPromise();
  }

  bookingtypeLists() {
  var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
   return this.http.get(environment.apiURL + '/api/GetAllRoles', { headers: reqHeader });
  }


  getbookingList() {
    return this.http.get(environment.apiURL + '/booking').toPromise();
  }

  userList() {
    return this.http.get(environment.apiURL + '/booking/GetUserList').toPromise();
  }


  guestList() {
    return this.http.get(environment.apiURL + '/booking/GetGuestList').toPromise();
  }


  channelList() {
    return this.http.get(environment.apiURL + '/booking/GetChannelList').toPromise();
  }

  getbookingByID(id: string): Observable<BookingRegister_Read_spParams> {
    return this.http.get<BookingRegister_Read_spParams>(environment.apiURL + '/booking/' + id);
  }

  deletebooking(id: number) {
    return this.http.delete(environment.apiURL + '/booking/' + id).toPromise();
  }

  saveOrUpdatebooking() {
    var body = {
      ...this.bookingData,
    };
    return this.http.post(environment.apiURL + '/booking/Postbooking', body);
  }
}