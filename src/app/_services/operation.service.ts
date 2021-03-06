import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/catch';
import { Alert } from 'selenium-webdriver';
import { stringify } from '@angular/compiler/src/util';
import { Floormodel } from './../_models/floormodel';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { 

  }

    GetAllReceiptviaRoomNo(BranchCode: string,RoomNo:string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/GetAllReceipt?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  GetGuestDetailViaRoomNo(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/GuestDetail?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }


  // GetCheckinDataViaRoomNovv(BranchCode: string,RoomNo:string)
  // {
  //   return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/CheckinData?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  // }


  GetExtraBedFormData(BranchCode: string,RoomNo:string,NoofBed:number)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/extrabedform?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo + '&NoofBed=' + NoofBed);
  }

  GetAmendFormData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/amendform?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  GetPaxEditFormData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/editpax?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  GetRoomShiftFormData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/roomshift?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }
  GetTarrif(RoomCode:string,Pax:number,BranchCode: string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/GetTarrif?RoomCode=' + RoomCode + '&Pax=' + Pax + '&BranchCode=' + BranchCode);
  }

  GetChangePlanFormData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/changeplan?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  GetDiscountFormData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/discount?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }
  GetChangeCompanyData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/changecompany?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  GetRoomTypeViaRoomNo(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/loadroomtype?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  SaveExtraBed(ExtreBed:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saveextrabed',ExtreBed,{ headers:environment.BASE_CONTENTTYPE_HEADER })  

  }

  SaveManagement(RoomManagement:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savemanagement',RoomManagement,{ headers:environment.BASE_CONTENTTYPE_HEADER })  

  }

  SaveRoomShifft(RoomShifft:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saveshift',RoomShifft,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SaveAmend(amend:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/amend',amend,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }


  SaveEditPax(Editpax:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saveeditrate',Editpax,{ headers:environment.BASE_CONTENTTYPE_HEADER })  

  }
  
  SaveChangeCompany(changecompany:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savechangecompany',changecompany,{ headers:environment.BASE_CONTENTTYPE_HEADER })  

  }
  SaveBlock(RoomBlock:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saveblock',RoomBlock,{ headers:environment.BASE_CONTENTTYPE_HEADER })  

  }

  SaveWakeupformation(wakeup:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savewakeup',wakeup,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SaveDiscountData(savefromdata:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savediscount',savefromdata,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SavePaxOnBil(paxonbill:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savepaxonbill',paxonbill,{ headers:environment.BASE_CONTENTTYPE_HEADER })  

  }

  SavePettyDetail(Petty:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/SavePettyCash',Petty,{ headers:environment.BASE_CONTENTTYPE_HEADER })  

  }

  SaveRoomCancel(RoomCancel:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/RoomCancel',RoomCancel,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SaveAdvanceData(advance:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saveadvance',advance,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

   SavePostChargeData(Post:any)
   {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savepost',Post,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
   }

   GetRoomValue(getvalue:any)
   {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/getroomvalue',getvalue,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  CheckHouseHuest(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/checkhouse?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }


  SaveHouseGuest(HouseGuest:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savehouseguest',HouseGuest,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }

  SavePlanForm(planform:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saveplan',planform,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }

  SaveRoomInstruction(instruction:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saveroominstruction',instruction,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }
  GetRoomInstructionData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getinstruction?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  ChangeGuestData(BranchCode: string,RoomNo:string,GuestCode:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/changeguest?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo + '&GuestCode=' + GuestCode);
  }
  
  GetLinkingRooms(BranchCode: string,RoomNo:string,desc:string)
  {
   return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getlink?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo + '&desc=' + desc);
  }
  UpdateLinkRoom(BranchCode: string,RoomNo:string,LinkRoom:string)
  {
  return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/updatelink?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo + '&LinkRoom=' + LinkRoom);
  }
  UpdateUnlinkRoom(BranchCode: string,RoomNo:string,LinkRoom:string)
  {
  return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/updateunlink?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo + '&LinkRoom=' + LinkRoom);
  }
  SaveRelase(realse:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/saverealse',realse,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }
  

  GetfoodcouponFormData(BranchCode: string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/foodcoupon?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  SaveFoodCoupon(food:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savefood',food,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }
  
  UpdateGroupBlocksRoom(BranchCode: string,des:string,LinkRoom:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/updategroubblock?BranchCode=' + BranchCode + '&des=' + des + '&LinkRoom=' + LinkRoom);
  }

  UpdateGroupReleaseRoom(BranchCode: string,des:string, LinkRoom:string)
  {
  return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/updaterelease?BranchCode=' + BranchCode + '&des=' + des + '&LinkRoom=' + LinkRoom);
  }
  SaveBlockinformation(Block:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/SaveBlock',Block,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }
  GetAllReceipt(BranchCode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getallreceipt?BranchCode=' + BranchCode);
  }
  GetAdvanceReceiptByReciptNo(BranchCode: string,ReceiptNo:string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getreceiptbyno?BranchCode=' + BranchCode + '&ReceiptNo=' + ReceiptNo);
  }
  GetAdvanceDetailByBookingNo(BranchCode: string,BookingNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getreceiptbyno?BranchCode=' + BranchCode + '&BookingNo=' + BookingNo);
  }

  GetAdvancelistForOccupiedRoom(BranchCode: string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/OAdvance?BranchCode=' + BranchCode);
  }

  
  SaveReservationPosting(ResAdvance:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/advanceposting',ResAdvance,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }

  EditCheckinAdvance(CheckinAdvance:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/advanceEdit',CheckinAdvance,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }

  LinkReservationAdvance(linkadvances:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/linkadvance',linkadvances,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }
  AdvanceTransfer(transferAd:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/transferAdvance',transferAd,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  
  }

  SaveGracePeroid(grace:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/savegrace',grace,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }

  SaveCompliment(compliment:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/Savecompliment',compliment,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }
  SaveDriverDetails(driver:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/operation/Savedriver',driver,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }

  CheckUserDiscountAndGrace(BranchCode:string,val:number,CreatedBy:number,type:string,des:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/checkgrace?BranchCode=' + BranchCode + '&val=' + val + '&CreatedBy=' + CreatedBy + '&type=' + type + '&des=' + des);
  }

  GetAdvanceReceiptByRoomNo(BranchCode:string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getreceiptbyno?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  GetComplementDataRoomWise(BranchCode:string,RoomNo:string)
  {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getcomplimentbyno?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  }

  }







































  // GetExtraBedTaxAmount(BranchCode: string,RoomNo:string,NoofBed:number)
  // {
  //   return this.http.get<any>(environment.apiURL + '/api/CloudHMS/operation/getexTax?BranchCode=' + BranchCode + '&RoomNo=' + RoomNo);
  // }