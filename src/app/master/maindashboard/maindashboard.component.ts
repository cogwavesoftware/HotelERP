import { Router } from '@angular/router';
import { ReservationService } from './../../_services/reservation.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { HmsdashboardService } from './../../_services/hmsdashboard.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BankService } from 'src/app/_services/bank.service';
@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'],
})
export class MaindashboardComponent implements OnInit, OnDestroy {

  // public roomsdetail:Observable<any>;
  public roomsdetail;
  model2: any = {};
  @ViewChild("f", { static: false }) form: any;
  roomname: any;
  DasboardLoad: any;
  floorname: any;
  rmno: string = "1000";
  roomname1: string;
  finalMenu = new Array();
  floor = new Array<any>();
  model: any;
  Branch: string;
  BookingList: any;
  constructor(private _masterformservice: MasterformService, private router: Router,
    private http: HttpClient, private _reservationservice: ReservationService,
    private _ipservice: IpserviceService, private _hmsdashboard: HmsdashboardService, private _bankservice: BankService) {
    // this._bankservice.changeMessage("collapsed")
    this.Branch = "CW_1001";
  }

  ngOnInit() {

    this._reservationservice.GetBookingList(this.Branch).subscribe(data => {
      this.BookingList = data;
      console.log(this.BookingList)

    });

    this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
      this.finalMenu = res;

      this.DasboardLoad = setInterval(() => {
        // alert('cal')
        this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
          this.finalMenu = res;
          console.log(this.finalMenu);
        })
      }, 7000)

    })

  }

  ngOnDestroy() {
    // this._bankservice.changeMessage("expanded")
    clearInterval(this.DasboardLoad);
  }

  LoadReservationCheckinpage(ResNo: string) {

    this.router.navigate(['/Master/reschk', ResNo])
  }

  OpenMyModel(event, name) {
    // var allbtn = document.querySelector('.modal');
    // //allbtn.classList.remove("model");
    // allbtn.classList.add("hidesa");
    // document.querySelector("#" + event).classList.add("md-show");
    // allbtn.classList.remove("hidesa");
    // //allbtn.classList.add("model");
  }


  openRoomsPopup(event, roomname) {
    this.model2 = {
      roomname: roomname,
    };
    console.log("roomname" + roomname);
    document.querySelector("#" + event).classList.add("md-show");
  }


  openspecial(event, roomname) {
    console.log("openspecial");
    document.querySelector("#" + event).classList.add("md-show");
  }
  parentroomhover(rmno: string, roomname1: string) {
    this.rmno = rmno;
    this.roomname1 = roomname1;
    console.log(this.rmno + this.roomname1);
  }


  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }

  // ------------------------------------Model--------------------
  // Post-OpenPosModel
  // Advance-OpenAdvanceModel
  // Shifft-OpenShifftModel
  // Discount-OpenDiscountModel
  // ExtraBed-OpenExtraBedModel
  // ChangePax-OpenChangepaxModel
  // Amend-OpenAmendModel
  // ChangeCompany-OpenChangeCompanyModel
  // HouseGuest-OpenHouseGuestModel
  // ChangePlan-OpenChangePlanModel
  // ChangeGuest-OpenChangeGuestModel
  // Instruction-OpenInstructionModel
  // FoodCoupon-OpenFoodCouponModel
  // PaxonBill-OpenPaxonBillModel
  // SmsCoupon-OpenSmsCouponModel
  // linkunlink-OpenlinkunlinkModel
  // WakeUp-OpenWakeUpModel
  // HouseKeeping-OpenHouseKeepingModel
  // Compliment-OpenComplimentModel
  // EditRate-OpenEditRateModel
  // ExpressCheckin-OpenExpressCheckinModel
  // Block-OpenBlockModel
  // Management-OpenManagementModel
  // Rate-OpenRateModel
  // RoomHistory-OpenRoomHistoryModel
  // GuestHistory-OpenGuestHistoryModel
  // Poweronvisit-OpenPoweronvisitModel
  // PoweronCleaning-OpenPoweronCleaningModel
  // PowerOff-OpenPowerOffModel
  // Release-OpenReleaseModel
  OpenModel(event, RoomNo) {
    let Description = event;
    switch (Description) {
      case "Discount":
        break;
      case "Post":
        break;
      case "Advance":
        break;
      case "Shifft":
        break;
      case "Discount":
        break;
      case "ExtraBed":
        break;
      case "ChangePax":
        break;
      case "Amend":
        break;
      case "ChangeCompany":
        break;
      case "HouseGuest":
        break;
    }
    console.log(event)
    console.log('event')
    document.querySelector("#" + event).classList.add("md-show");
  }


}


