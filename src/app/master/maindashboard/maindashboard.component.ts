import { filter } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { BlockingdetailsComponent } from './blockingdetails/blockingdetails.component';
import { Router } from '@angular/router';
import { ReservationService } from './../../_services/reservation.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit,DoCheck } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { HmsdashboardService } from './../../_services/hmsdashboard.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BankService } from 'src/app/_services/bank.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'],
})
export class MaindashboardComponent implements OnInit, OnDestroy {
  public roomsdetail;
  model2: any = {};
  @ViewChild("f", { static: false }) form: any;
  roomname: any;
  DasboardLoad: any;
  floorname: any;
  rmno: string;
  Refinputs:string;
  roomname1: string;
  RoomCodes:string;
  RoomNos:string;
  finalMenu = new Array();
  floor = new Array<any>();
  vacantRoom=new Array<any>();
  timepicker: Partial<TimepickerConfig>;
  model: any;
  Branch: string;
  BookingList: any;
  myTime = new Date();
  valid: boolean = true;
  isValid(event: boolean): void {
    this.valid = event;
  }

  @ViewChild(BlockingdetailsComponent, {static:false}) block : BlockingdetailsComponent
  @ViewChild('Name1', {static:false}) name : ElementRef
  constructor(private datePipe: DatePipe,private _masterformservice: MasterformService, private router: Router,
    private http: HttpClient, private _reservationservice: ReservationService,
    private _ipservice: IpserviceService, private _hmsdashboard: HmsdashboardService, 
    private _bankservice: BankService) {
  
    this.Branch = "CW_1001";
  }

  ngOnInit() {

    this.model={
      Id:0,
      BranchCode:this.Branch,
      IpAdd:1,
      CreatedBy:1,
      RoomNo:this.RoomNos,
      RoomCode:this.RoomCodes,
      Pax:0,
      SRoomNo:"select" 
    }    
    this._reservationservice.GetBookingList(this.Branch).subscribe(data => {
      this.BookingList = data;
    });
      this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
      this.finalMenu = res;
      this.vacantRoom=res['Rooms'].filter(a=>a.Status=="V");
      this.DasboardLoad = setInterval(() => {
      this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
          this.finalMenu = res;
          this.vacantRoom=res['Rooms'].filter(a=>a.Status=="V");    
        })
      }, 7000)
    })
  }



  ngOnDestroy(){
    clearInterval(this.DasboardLoad);
  }
  


  LoadReservationCheckinpage(ResNo: string){
    this.router.navigate(['/Master/reschk', ResNo])
  }

  OpenMyModel(event, name){
    document.querySelector("#" + event).classList.add("md-show");
   }


  openRoomsPopup(event, roomname) {
   
    this.model2 = {
      roomname: roomname,
    };
    console.log("roomname" + roomname);
    document.querySelector("#" + event).classList.add("md-show");
  }

OpenBlockDetails(event){
  console.log("openspecial"  );
  document.querySelector("#" + event).classList.add("md-show"); 
}
 
openspecial(event, roomname){
  console.log("openspecial"  );
  document.querySelector("#" + event).classList.add("md-show");
}
parentroomhover(CrRoomNo:string,CrRoomCode:string){
  this.rmno = CrRoomNo;
  this.roomname1=CrRoomCode;
  this.RoomNos=CrRoomNo;
  this.RoomCodes=CrRoomCode;
  console.log('Francis');  
  console.log(CrRoomNo + CrRoomCode); 
}


modelroomhover (){
  console.log("test");
}

// AddOrEditOrderItem(orderItemIndex, OrderID) {
//   const dialogConfig = new MatDialogConfig();
//   dialogConfig.autoFocus = true;
//   dialogConfig.disableClose = true;
//   dialogConfig.width = "50%";
//   dialogConfig.data = { orderItemIndex, OrderID };
//   this.dialog.open(BlockingdetailsComponent, dialogConfig).afterClosed().subscribe(res => {
//     //this.updateGrandTotal();
//   });
// }

popinsidepopforguestnamefunc(event){ 
  document.querySelector("#" + event).classList.add("md-show");
  alert("fdfdf")
  
}
popinsidepopforguestnamefunc1(event){
  document.querySelector("#" + event).classList.add("md-show");
}
  
closeMyModalPin(event){
  console.log("remove");
  var openModals = document.querySelectorAll(".md-show");
  for(let i = 0; i < openModals.length; i++) {
    openModals[i].classList.remove("md-show"); 
  } 
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
      case "Blockdetails":
        break;
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
        case "PaxonBill":
          alert('pax')         
          break;       
    }
    console.log(event)
    console.log('event')
    document.querySelector("#" + event).classList.add("md-show");
  }
  OpenModelWithRoomDetails(event){
    let Description = event;
    switch (Description) {
      case "linksGroup":
        break;       
        case "OccupiedPopup":
        break;               
      case "idblockingdetails":
        break;
      case "vacantdetails":
        break;
        
    }
    console.log(event)
    console.log('event')
    document.querySelector("#" + event).classList.add("md-show");
  }
    

  modalVacentHide(event){ 
    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
 
  }
}


