import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MasterformService } from '../../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { Observable } from "rxjs"; 
import { DatePipe } from "@angular/common";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'


@Component({
  selector: 'app-taxmaster',
  templateUrl: './taxmaster.component.html',
  styleUrls: ['./taxmaster.component.scss']
})
export class TaxmasterComponent implements OnInit {   
  public TaxCode:any; 
  public data: Observable<any>;

  public filterdatax: any;

  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
   position='top-right';
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
  
 mode: string;
 Branch:string;
 filterdata:any;
 
  @ViewChild("f", { static: false }) form: any;
  constructor(private datePipe: DatePipe,
    private _masterformservice:MasterformService,
    private toastyService: ToastyService,
    private _ipservice:IpserviceService) {
      this.Branch= localStorage.getItem("BranchCode");
     }

  ngOnInit() {   
    this.btitle="Add Item";
    this.resetForm(); 
    
    this.data = this._masterformservice.GetRoomTaxMaster(this.Branch);

    this._masterformservice.GetRoomTaxMaster(this.Branch).subscribe(data=>{
      this.filterdata=data;
    });

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

  resetForm(form?: NgForm)
  {
     this.model = {
      TaxCode:"0",   
      TaxName:null,
      EffectiveDate:null,
      ToDate:null,         
    };  
  }
  openMyModalData(event) {     
     this.btitle="Hide Form"    
     this.isShown = true;
     this.data.subscribe(response => {
       this.model.TaxCode=response[event]['TaxCode'];   
       this.model.TaxName=response[event]['TaxName']; 
       this.model.EffectiveDate=response[event]['EffectiveDate']; 
       this.model.ToDate=response[event]['ToDate'];   
       this.mode = "(Edit)"+  this.model.TaxName;   
     });
   
   }
   onSubmict()
   {
     console.log(this.form.value);          
     if (this.form.valid)
     {
       console.log("Form Submitted!");    
     }     
   }

   onSubmit(form?: NgForm) {
  
    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id")
    form.value.ModifyBy = localStorage.getItem("id")
    form.value.IpAdd = localStorage.getItem("LOCAL_IP")

    console.log(form.value);

    console.log("Form Submitted!");    
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "TaxMaster already Exist ", "warning");
      return;
    }

    this._masterformservice.SaveTaxMaster(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.TaxCode == "0") {
          this.addToast(
            "Cogwave Software",
            "TaxMasterSaved Sucessfully",
            "success"
          );
          form.reset({
            TaxCode: "0"
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "TaxMaster  Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "TaxMaster Not Saved", "error");
        form.reset({
          TaxCode: "0"
        });
        this.isShown = true;
      }
    });

    setTimeout(() => {
      this.data = this._masterformservice.GetRoomTaxMaster(this.Branch);
 
    }, 0);
   
    this._masterformservice.GetRoomTaxMaster(this.Branch).subscribe(data=>{
      this.filterdata=data;
    });
   
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


   Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.mode = "(List)";
  }
   
  openMyModal(event,data) 
  {
    this.model = {  
      TaxCode:data.TaxCode,   
      TaxName: data.TaxName,
      EffectiveDate:data.EffectiveDate,
      ToDate:data.ToDate      
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
