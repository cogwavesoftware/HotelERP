import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MasterformService } from '../../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { Observable } from "rxjs"; 
import { DatePipe } from "@angular/common";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'

 
@Component({
  selector: 'app-taxdetail',
  templateUrl: './taxdetail.component.html',
  styleUrls: ['./taxdetail.component.scss']
})
export class TaxdetailComponent implements OnInit {
  
  catagerys=['80C','8080D'];
  
  public TaxCode:any; 
  public data: Observable<any>;
  public datafilt: Observable<any>;
 position='top-right';
  public filterdatax: any;
  catageryhasError: boolean;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  findnamef1: string;
  findnamef2: string;   
  isValid: boolean;
  public isShown: boolean = false;
  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  closeOther = false;
  btitle: string = "Add Floor";
  model: any = {};
  IsExistdata: boolean = false;
  ipAddress:string;
  @ViewChild("f", { static: false }) form: any;
  mode: string;
 Branch:string;
 filterdata:any;
 taxmaster:any;
  public radioSelected:string;
  
  constructor(private datePipe: DatePipe,private _masterformservice:MasterformService,
    private toastyService: ToastyService,
    private _ipservice:IpserviceService)
    {
    this.model.roomtype="Room";
    this.Branch= localStorage.getItem("BranchCode");
   }

  ngOnInit() {
    this.btitle="Add Item";
    this.resetForm();
    this.data = this._masterformservice.GetRoomTaxDetail(this.Branch);
    this.datafilt=Object.assign({},this.data) 
   
    this._masterformservice.GetRoomTaxDetail(this.Branch).subscribe(data=>{
      this.filterdata=data;
    });

    this._masterformservice.GetRoomTaxMaster(this.Branch).subscribe(res=>{
      this.taxmaster=res;
    });
  }
  validateplan(value) {
    if (value === "default") {
      this.catageryhasError = true;
    } else {
      this.catageryhasError = false;
    }
  }
  getIP()
  {
    this._ipservice.getIpAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      console.log(this.ipAddress)
    });
  }


  Showhide() {
    this.resetForm();
    if (this.btitle == "Hide Form") {
      this.isShown = false;
      this.btitle = "Add Item";
      this.mode = "(List)";
    } else {
      this.isShown = true;
      this.btitle = "Hide Form";
      this.mode = "(New)";
    }
  }

  validateroom(value) {
    if (value === 'default') 
    {
      this.catageryhasError = true;
    } else {
      this.catageryhasError = false;
    }
  }
  resetForm(form?: NgForm)
  {
     this.model = {
      RNO: 0,
      TaxCode:'-1',   
      TaxName:null,
      FromAmount:null,
      ToAmount:null,
      TaxPer:null,      
      EffectiveDate:null, 
      ToDate:null,
      IsActive:true,
      TaxCode1:'-1'
    };  
  }
  openMyModalData(event) {     
     this.btitle="Hide Form"    
     this.isShown = true;
     this.data.subscribe(response => {
       this.model.Id=response[event]['Id'];
       this.model.TaxCode=response[event]['TaxCode'];   
       this.model.TaxName=response[event]['TaxName']; 
       this.model.EffectiveDate=response[event]['EffectiveDate']; 
       this.model.ToDate=response[event]['ToDate'];   
       this.model.FromAmount=response[event]['FromAmount']; 
       this.model.ToAmount=response[event]['ToAmount'];         
       this.model.IsActive=response[event]['IsActive']; 
       this.model.TaxPer=response[event]['TaxPer']; 
       this.model.TaxType = response[event]['TaxType']; 
        this.mode = "(Edit)"+  this.model.TaxName;
     });
   
   }
   LoadTaxData(value)
   {
     if(value=="-1")
     {
     
      this.data = this._masterformservice.GetRoomTaxDetail(this.Branch);
    
     }
     else{
      this.data = this._masterformservice.GetRoomTaxDetailByTaxName(this.Branch,value);
     }
    

   }

   

   onSubmit(form?: NgForm) {

    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id")
    form.value.ModifyBy = localStorage.getItem("id")
    form.value.IpAdd = localStorage.getItem("LOCAL_IP")


    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    // if (this.IsExistdata === true) {
    //   this.addToast("Cogwave Software", "TaxDetail already Exist ", "warning");
    //   return;
    // }

    this._masterformservice.SaveTaxdetail(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.RNO == "0") {
          this.addToast(
            "Cogwave Software",
            "TaxDetail Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            RNO: "0",
            TaxCode1:'-1'
          });
          this.isShown = true;
          this.data = this._masterformservice.GetRoomTaxDetail(this.Branch);
        } else {
          this.addToast(
            "Cogwave Software",
            "TaxDetail Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
          this.data = this._masterformservice.GetRoomTaxDetail(this.Branch);
        }
      } else {
        this.addToast("Cogwave Software", "TaxDetail Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          RNO: "0",
          TaxCode1:'-1'
        });
        this.isShown = true;
      }
    });

  
  }

 
   Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.mode = "(List)";
  }

   openMyModal(event,data) 
   {
     this.model = {  
       Id:data.Id,
       TaxCode:data.TaxCode,   
       TaxName: data.TaxName,
       EffectiveDate:data.EffectiveDate,
       ToDate:data.ToDate,   
       FromAmount:data.FromAmount,   
       ToAmount:data.ToAmount,
       IsActive:data.IsActive,
       TaxType:data.TaxType
     };
     document.querySelector('#' + event).classList.add('md-show');
   }
   closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


  addToast(title, Message, theme) {
    debugger;
    this.toastyService.clearAll();
    const toastOptions: ToastOptions = {
      title: title,
      msg: Message,
      showClose: false,
      timeout: 3000,
      theme: theme,
      onAdd: (toast: ToastData) => {
        //console.log('Toast ' + toast.id + ' has been added!');
        // this.router.navigate(['/dashboard/default']);
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (theme) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        debugger;
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }
}
