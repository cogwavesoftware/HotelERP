import { bookingService } from '../../shared/booking.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//import { bookingTable } from 'src/app/shared/booking.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styles: []
})
export class bookingComponent implements OnInit {
  isValid: boolean = true;
  mReservationFrom: NgbDateStruct;
  mReservationTo: NgbDateStruct;

  bookingList;
  bookingtypeList;
  statusList;
  guestList;
  channelList;

  constructor(private service: bookingService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    this.masterList();

    //  alert('test0');
    let bookingid = this.currentRoute.snapshot.paramMap.get('id');
    //    alert('test00');
    if (bookingid == null) {
      this.resetForm();
    }
    else {
      this.service.getbookingByID(bookingid).subscribe(c => {
        this.service.formData = c;
        alert(c[0]);

      });
    }
  }

  masterList() {
    this.service.statusList().then(res => this.statusList = res);
    this.service.bookingtypeList().then(res => this.bookingtypeList = res);
    this.service.guestList().then(res => this.guestList = res);
    this.service.channelList().then(res => this.channelList = res);
  }


  getdata()
  {
    console.log("frad");
  }

  resetForm(form?: NgForm) {
    //alert('test1');
    if (form = null)
      form.resetForm();
    // this.service.formData = {
    //   bookingID: 0,
    //   bookingName: '',
    //   GSTNo: '',
    //   bookingAddress: '',
    //   Contact1: '',
    //   Contact2: '',
    //   eMail: '',
    //   ContactPerson:''
    // }; 
  }



  validateForm() {
    this.isValid = true;
    return this.isValid;
  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {

      if (this.mReservationFrom) {
        this.service.bookingData.bkM_ReservationFrom = new Date(this.mReservationFrom.year, this.mReservationFrom.month - 1, this.mReservationFrom.day + 1);

      }
      if (this.mReservationTo) {
        this.service.bookingData.bkM_ReservationTo = new Date(this.mReservationTo.year, this.mReservationTo.month - 1, this.mReservationTo.day + 1);
      }

      this.service.bookingData.bkM_BookingVia = '';
      this.service.bookingData.bkM_BranchID = 1;
      this.service.bookingData.bkM_BookingDateTime = new Date();
      this.service.bookingData.bkM_StatusDateTime = new Date();
      this.service.bookingData.bkM_UserIDCreation = 1;
      this.service.bookingData.bkM_IPAddressCreation = '';
      this.service.bookingData.bkM_DateTimeCreation = new Date();
      this.service.bookingData.bkM_UserIDModification = 1;
      this.service.bookingData.bkM_IPAddressModification = '';
      this.service.bookingData.bkM_DateTimeModification = new Date();


      this.service.saveOrUpdatebooking().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'Restaurent App.');
        this.router.navigate(['/bookings']);
      })
    }
  }

}
