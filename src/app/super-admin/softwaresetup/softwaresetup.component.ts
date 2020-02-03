
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../_services/branch.service';
import { CompanyService } from '../../_services/company.service';
@Component({
  selector: 'app-softwaresetup',
  templateUrl: './softwaresetup.component.html',
  styleUrls: ['./softwaresetup.component.scss']
})
export class SoftwaresetupComponent implements OnInit {
  model :any={};
  model1 :any={};
  catagerys:any=[]; 
  switchDisable=false;
  catageryhasError:boolean=false;
  IsCheckoutContinue:boolean=false;
  noPrefiixdiv:boolean=false;
  minlenth:number;
  smtphost:string;
  smtpport:string;
  btitle:string="+ Add"
  companylist:any;
  branhlist:any;
  topicHasError = true;
  Roomtyeps=['I Need Prefix','I dont Want Prefix on Bill'];
  constructor(private _branchservoce:BranchService,private _companyservice:CompanyService) { }

  ngOnInit() {

    this._companyservice.getcompanydata().subscribe(res => {   
      this.companylist = res ;
    });

   this._branchservoce.getBranchdata().subscribe(res => {   
    this.branhlist = res ;
  });
          
    //  this._branchservoce.GetAllBillHeader().subscribe(data=>{
    //    this.catagerys=data;
    //  })
    this.model.PurchaseId=-1;
    this.model.CompanyId=-1;
     this.model.noPrefix=false;
     this.model.smtpport="587"; 
     this.model.smtphost="smtp.gmail.com";
     //switch
     this.model.IsSMS=true;
    this.model.IsPower=false;
    this.model.IsHktab=false;
    this.model.Databackup=true;
    this.model.IsPos=true;
    this.model.teleservice=false;
    this.model.groupcheckin=true;
    this.model.groupckout=true;
    this.model.splitcheckout=true;
    this.model.presettlement=false;
    
    this.model.iscontinousdiscount=true;
    this.model.IsEmail=true;
    this.model.Discountcoupon=true;
    this.model.IsBulkprovider=true;
    this.model.mobileApp=true;
    this.model.IsDoorlocking=false;
    this.model.ISBTB_BTCBILL=false;
    this.model.IsAdvanceReceiptserious=true;
    this.model.Ispostbillsameserious=true;
    this.model.IsPaymentgateway=true;
    this.model.IsCheckin24=true;
    this.model.Isbluetooth =false;

    this.model.IsroomserviceNo ;
    this.model.IsHousekeepingNo ;
    this.model.IsReservetionNo ;
    this.model.FrontDesk ;
    this.model.GentralAdvance="/GEN/"
    this.model.CompanyAdvance="/COM/"
    this.model.PostCharge="/POS/"
    this.model.Extrabed="/EXB/"
    this.model.SettlementReceipt="/SRE/"
    this.model.OutstandingReceipt="/SET/"
    this.model.ReservationAdvanceReceiptserious="/RES/"
    this.model.normalAdvanceReceiptserious="/ADV/"
    this.model.checkinAdvanceReceiptserious="/CHK/"
    this.model.RefundReceipt="/REF/"
    this.model.ComplimentaryBill="/CMP/"
    this.model.checkoutbillPrefix="/BILL/"
    this.model.BTBPREFIX="/BTB/"
    this.model.BTCPREFIX="/BTC/"
  
    
  }
  
  
   onSubmit()
   {
     console.log(this.model)
     this._branchservoce.SaveSoftwaretoolSetup(this.model).subscribe(data=>{

     });
     
   }

  

}
