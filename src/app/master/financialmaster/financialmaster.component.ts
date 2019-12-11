
import { Component, OnInit , ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { AuthenticationService } from './../../_services/authentication.service';
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'


@Component({
  selector: 'app-financialmaster',
  templateUrl: './financialmaster.component.html',
  styleUrls: ['./financialmaster.component.scss']
})
export class FinancialmasterComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";
  isValid: boolean;

  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  closeOther = false;
  isroomt: string;
  isroomc: string;
  ipAddress: string;
  Branch:string;
  mode:string;
  IsReset:boolean=true;
  iscontinue:boolean=true;
  @ViewChild("f", { static: false }) form: any;
  constructor(private _masterformservice: MasterformService,private _authenservice: AuthenticationService,
    private toastyService: ToastyService
    ) { }

    ngOnInit() {
      this.resetForm();
      this.btitle = "Add Item";
      this.mode = "(List)";
      this.isShown = true;
      this.Branch= localStorage.getItem("BranchCode");
      this.data = this._masterformservice.GetAllFinancial(this.Branch);
    }
    mouseEnter(div : string){
      if(div=="Re"){
      this.IsReset=!this.IsReset;
      }
      else
      {
        this.iscontinue=!this.iscontinue;
      }
   }

   mouseLeave(div : string){
    if(div=="Re"){
      this.IsReset=!this.IsReset;
      }
      else
      {
        this.iscontinue=!this.iscontinue;
      }
   }
    Showhide() {
      this.resetForm();
      if (this.btitle == "Hide Form") {
        this.isShown = false;
        this.btitle = "Add Item";
        this.mode = "(List)";
      } else {
        this.resetForm();
        this.isShown = true;
        this.btitle = "Hide Form";
        this.mode = "(New)";
      }
    }
  resetForm(form?: NgForm)
  {
     this.model = {     
      BranchCode:localStorage.getItem('BranchCode'),
      IpAdd:localStorage.getItem('LOCAL_IP'),
      CreatedBy:localStorage.getItem('id'),
    };  
  }

  
  openMyModalData(event) {
   
     this.btitle="Hide Form"    
     this.isShown = true;
     this.data.subscribe(response => {
       this.model.Id=response[event]['Id'];
       this.model.TrDate=response[event]['TrDate']; 
       this.model.FinFromDt=response[event]['FinFromDt'];
       this.model.FinToDt=response[event]['FinToDt'];
       this.model.FinCYear=response[event]['FinCYear'];
       this.model.FinNYear=response[event]['FinNYear'];
       this.model.CurrentStatus=response[event]['CurrentStatus'];           
     });
   
   }
   onSubmit()
   {
     console.log(this.form.value);          
     if (this.form.valid)
     {
       console.log("Form Submitted!");    
     }     
   }


   ProcessData(ProcessD :string)
   {
    this.model.BranchCode = localStorage.getItem("BranchCode");
    this.model.CreatedBy = localStorage.getItem("id");
    this.model.ModifyBy = localStorage.getItem("id");
    this.model.IpAdd = localStorage.getItem("LOCAL_IP");
    this.model.Process=ProcessD;
    this._masterformservice.Savefinancial(this.model).subscribe(data => {
      if (data == true) 
      {
        this.addToast(
          "Cogwave Software",
          "Sucessfully Processed Financial Please Login",
          "success"
        );
       this._authenservice.logout();
      } 
        else {
          this.addToast(
            "Cogwave Software",
            "Floor Data Updated Sucessfully",
            "success"
          );
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
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
       TrDate:data.TrDate,   
       FinFromDt: data.FinFromDt,
       FinToDt:data.FinToDt,
       FinCYear:data.FinCYear,
       FinNYear:data.FinNYear,
       CurrentStatus:data.CurrentStatus        
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
