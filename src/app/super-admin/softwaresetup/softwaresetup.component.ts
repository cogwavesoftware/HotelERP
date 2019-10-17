
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../_services/branch.service';
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
  //catagerys=['CheckoutBill','CheckoutBillBTC','CheckoutBillBTB','Advance','CheckinAdvance','ReservationAdvance','PostCharge','Extrabed','SettlementReceipt','Outstanding Settlement Receipt','ComplimentaryBill'];
  topicHasError = true;
  Roomtyeps=['I Need Prefix','I dont Want Prefix on Bill'];
  constructor(private _branchservoce:BranchService) { }

  ngOnInit() {
         this.model.smtpport="587"; 
         this.model.smtphost="smtp.gmail.com";  
     this._branchservoce.GetAllBillHeader().subscribe(data=>{
       this.catagerys=data;
     })
     this.model.noPrefix=false;

     //switch
     this.model.IsHms=true;
    this.model.power=false;
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
    this.model.IsCheckoutBillcontinous=true;
    this.model.IsAdvanceReceiptserious=true;
    this.model.Ispostbillsameserious=true;
    this.model.IsPaymentgateway=true;
    this.model.IsCheckin24=true;
    this.model.Isbluetooth =false;

    this.model.IsroomserviceNo ;
    this.model.IsHousekeepingNo ;
    this.model.IsReservetionNo ;
    this.model.FrontDesk ;
  
   

    this.model1.topic="default";
    this.model1.catagery="default";
    
    
  }
  
   updateSelectedRoles(index) 
   {
     console.log(index)
   }

   onSubmit()
   {
     console.log(this.model)
     this._branchservoce.SaveSoftwaretoolSetup(this.model).subscribe(data=>{

     });
     console.log(this.model1)
   }

   validateTopic(value)
    {
    if (value === 'default')
     {
      this.topicHasError = true;
      this.IsCheckoutContinue=false;
    } 
    else 
    {
    
      this.topicHasError = false;
      if(value=="I Need Prefix")
      {
        this.IsCheckoutContinue=true;
        this.minlenth=7
      }
      else{
        this.IsCheckoutContinue=false;
        this.minlenth=0
      }
  
    }
  }

   validateroom(value) 
   {
    this.minlenth=7
    if (value === 'default') 
    {
      this.catageryhasError = true;
      this.IsCheckoutContinue=false
    }
    else 
    {
      this.catageryhasError = false;
      if(value=="CheckoutBill")
      {    
        this.noPrefiixdiv=true  
        this.IsCheckoutContinue=false           
      }
      else
      {
        this.noPrefiixdiv=false
        this.IsCheckoutContinue=true
      }
 
    }

  }


  

}
