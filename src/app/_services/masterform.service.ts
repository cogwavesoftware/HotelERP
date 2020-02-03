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
export class MasterformService {

  constructor(private http: HttpClient) { }

  GetBankdetails(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/GetBankdetails?BranchCode=' + branchcode);
  }
  getreferencedetail(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Getreference?BranchCode=' + branchcode);
  }
  getplan() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Plan');
  }
  GetAllRoomNo(branchcode: string): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/roomdetails?BranchCode=' + branchcode);
  }

  getwalet() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/walet');
  }
  getpurpose() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/visit');
  }
   
  getothertaxAll(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/othertaxall?BranchCode=' + branchcode);
  }

  getothertax(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/othertax?BranchCode=' + branchcode);
  }
  getothertaxEdit(branchcode: string, Id: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/othertaxEdit?BranchCode=' + branchcode + '&Id=' + Id);
  }

  GetUserProductEdit(branchcode: string, Id: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/userproductEdit?BranchCode=' + branchcode + '&Id=' + Id);
  }


  getplanbyid(branchcode: string, plan: number) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/planbyId?BranchCode=' + branchcode + '&PlanId=' + plan);
  }
  getallplanopr(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/planopr?BranchCode=' + branchcode);
  }
  getrevenudata(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/revenue?BranchCode=' + branchcode);
  }
  getledger(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/ledger?BranchCode=' + branchcode);
  }
  saveplancreation(planmodel: any) {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/Saveplanopr', planmodel, { headers: environment.BASE_CONTENTTYPE_HEADER })
      .pipe(map(res => {
        return res;
      }));
  }
  SaveitemMaster(itemmodel: any) {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/Saveitem', itemmodel, { headers: environment.BASE_CONTENTTYPE_HEADER })
      .pipe(map(res => {
        return res;
      }));
  }
  getaxEditforRevenu(branchcode: string, Id: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/taxEditreven?BranchCode=' + branchcode + '&Id=' + Id);
  }

  getitemmaster(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/item?BranchCode=' + branchcode);
  }
  getAllRoles() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/role');
  }


  GetPinAddress() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/pincode');
  }

  getclientproduct(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/cproduct?BranchCode=' + branchcode);
  }


  GetUserproduct(branchcode: string,UserId:number) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/UserproductDate?BranchCode=' + branchcode + '&UserId=' + UserId);
  }
  SaveRoomDetail(roomdetail:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveroomdetails',roomdetail,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SaveBankDetail(Bankdetail)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savebankdetails',Bankdetail,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
  SavePlanmaster(Planmaster:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savecommonplan',Planmaster,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SaveWalet(walet:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savewallet',walet,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
  Saveothertax(othertax:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveothertax',othertax,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SaveLedger(ledger:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveledgers',ledger,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
  Saverevenu(rev:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saverevenue',rev,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
  SaveReferance(reference:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveref',reference,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
  SaveVisit(Visit:any)
  {
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savepurpose',Visit,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  Saveitemmaster(itemmaster:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveitems',itemmaster,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  GetCreditCard(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/creditcard?BranchCode=' + branchcode);
  }

  SaveCreditCard(Creditcard:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savecard',Creditcard,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SavePinCode(pincod:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savepin',pincod,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  GetRoomTaxMaster(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/taxmaster?BranchCode=' + branchcode);
  }

  SaveTaxMaster(taxmaster:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/SaveTaxmaster',taxmaster,{ headers:environment.BASE_CONTENTTYPE_HEADER })
  }


  GetRoomTaxDetail(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/taxdetail?BranchCode=' + branchcode);
  }
  GetRoomTaxDetailByTaxName(branchcode: string,Taxcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/taxdetailBytaxname?BranchCode=' + branchcode + '&Taxcode=' + Taxcode);
  }


  
  GetRoomcomany(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/roomcompany?BranchCode=' + branchcode);
  }


  GetAllRoomCompanyType() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/roomcompanytype');
  }
  
  SaveCompany(company:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savecompany',company,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }


  GetAlluserDetails(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/getAlluser?BranchCode=' + branchcode);
  }

  GetAllFinancial(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/getfinancial?BranchCode=' + branchcode);
  }


  Savefinancial(financial:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/Savefinancial',financial,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }


  GetAllTaxRule() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/getalltaxrule')
  }
  GetRuledApplicable(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/getruledApplicable?BranchCode=' + branchcode);
  }

  GetAddressBook(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/getaddressbook?BranchCode=' + branchcode);
  }


  SaveAddressBook(Addressbook:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveaddressbook',Addressbook,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  SavaImsData(formData:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/SavaImss',formData,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
   

  


  SaveuserRight(userdata:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/Userrightlistsave',userdata,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }

  Getmiscellaneous(HeadersDesc: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Miscell?HeaderDescription=' + HeadersDesc);
  }


  GetGuestDetails(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/guest?Branchcode=' + branchcode);
  }

  SaveGuestData(GuestData:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveguest',GuestData,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
  getBookss() 
  {
     
     var Sql=environment.apiURL + '/api/CloudHMS/Master/Userrightlist';
     console.log(Sql)
     return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Userrightlist');
  }


  GetUserRights(UserId:number,ProductId:number) 
  {
     
     var Sql=environment.apiURL + '/api/CloudHMS/Master/Userrightlist';
     console.log(Sql)
     return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/Userrightlist?UserId=' + UserId + '&ProductId=' + ProductId);
  }

  SaveuserCreation(usermodel:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/Saveusercreation',usermodel,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }


  GetSwardDetail(branchcode: string) {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/getstward?BranchCode=' + branchcode);
  }

  SaveStwardDetails(Stward:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/savestward',Stward,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }
  GetMiscHeaders() {
    return this.http.get<any>(environment.apiURL + '/api/CloudHMS/Master/MiscHeader');
  }

  SaveMisc(misc:any){
    return this.http.post(environment.apiURL + '/api/CloudHMS/Master/saveMiscDetails',misc,{ headers:environment.BASE_CONTENTTYPE_HEADER })  
  }




  // registerUser(user: User,roles : string[]) {
  //   const body = {
  //     UserName: user.UserName,
  //     Password: user.Password,
  //     Email: user.Email,
  //     FirstName: user.FirstName,
  //     LastName: user.LastName,
  //     Roles : roles
  //   }
  //   var reqHeader = new HttpHeaders({'No-Auth':'True'});
  //   return this.http.post(environment.apiURL + '/api/User/Register', body,{headers : reqHeader});
  // }

}
