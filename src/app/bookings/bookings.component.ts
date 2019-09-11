import { Component, OnInit } from '@angular/core';
import { bookingService } from '../shared/booking.service';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingRegister_Read_spParams } from '../shared/BookingParams.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styles: []
})
export class bookingsComponent implements OnInit {
  // mStatusID: number = 0;
  // mBookingTypeID: number = 0;
  // mUserID: number = 0;
  // NoofBookings: number = 0;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  bookingList;
  bookingtypeList;
  statusList;
  userList;
  svcBookingParams: BookingRegister_Read_spParams;

  constructor(private service: bookingService,
    private router: Router,
    private toastr: ToastrService) {

    this.svcBookingParams = this.service.formData;
  }

  ngOnInit() {
    this.masterList();
  }

  masterList() {

    this.service.statusList().then(res => this.statusList = res);
    this.service.bookingtypeList().then(res => this.bookingtypeList = res);
    this.service.userList().then(res => this.userList = res);

  }

  onbtnSearchclick() {

    if (this.fromDate) {
      this.service.formData.FromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1);

    }
    if (this.toDate) {
      this.service.formData.ToDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1);
    }

    this.service.getbookingListParams().then(res => this.bookingList = res);
  }

  openForEdit(bookingID: number) {
    this.router.navigate(['/booking/edit/' + bookingID]);
  }
  refreshList() {

  }

  onbookingDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletebooking(id).then(res => {
        this.refreshList();
        this.toastr.warning("Deleted Successfully", "Restaurent App.");
      });
    }
  }

}