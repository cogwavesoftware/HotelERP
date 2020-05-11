
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
  public HDesc="";
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
  mischeader:any;
  @ViewChild("f", { static: false }) form: any;
  constructor(private _masterformservice: MasterformService,private _authenservice: AuthenticationService,
    private toastyService: ToastyService
    ) { }

    ngOnInit() {
      this.resetForm();
      this.btitle = "Add Item";
      this.mode = "(List)";
      this.Branch= localStorage.getItem("BranchCode");
      this.data = this._masterformservice.Getmiscellaneous(this.HDesc);
      this._masterformservice.GetMiscHeaders().subscribe(res => {
        this.mischeader = res;
        console.log(this.mischeader)
      });
      
       
      
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
      Code: 0,
      TypeId: -1,
      TypeId1: -1,
      Description:null,
      ShortDescription:null,        
      Activeyn:true,          
      BranchCode:localStorage.getItem('BranchCode'),
      IpAdd:localStorage.getItem('LOCAL_IP'),
      CreatedBy:localStorage.getItem('id'),
    };  
  }

  
  openMyModalData(event) {
   
     this.btitle="Hide Form"    
     this.isShown = true;
     this.data.subscribe(response => {
       this.model.Code=response[event]['Code'];
       this.model.Description=response[event]['Description']; 
       this.model.ShortDescription=response[event]['ShortDescription'];
       this.model.Activeyn=response[event]['Activeyn'];
       this.model.TypeId=response[event]['TypeId'];              
     });
   }
   LoadTypeData(value)
   {
     debugger;
     if(value=="-1")
     {
      this.HDesc="";
      this.data = this._masterformservice.Getmiscellaneous(this.HDesc);
    
     }
     else
     {
       let status:ListItemSimplified =this.mischeader.find(s => s.TypeId == value);
      if(status)
      {
        this.HDesc=status.Description;
      }
      else
      {
        this.HDesc="";
      }
      
      this.data = this._masterformservice.Getmiscellaneous(this.HDesc);
     }
   }

   onSubmit()
   {
     debugger;
    this.model.BranchCode = localStorage.getItem("BranchCode");
    this.model.CreatedBy = localStorage.getItem("id");
    this.model.UpdatedBy = localStorage.getItem("id");
    this.model.IpAdd = localStorage.getItem("LOCAL_IP");
     console.log(this.form.value);  
             
     if (this.form.valid)
     {
      this._masterformservice.SaveMisc(this.model).subscribe(data => {
        if (data == true) 
        {
          this.addToast(
            "Cogwave Software",
            "Sucessfully Added Miscellaneous",
            "success"
          );
         this._authenservice.logout();
        } 
          else {
            this.addToast(
              "Cogwave Software",
              "Miscellaneous Data Updated Sucessfully",
              "success"
            );
            
          }
          this.form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
          
      });   
     } 
     this.HDesc ="";  
     this.data = this._masterformservice.Getmiscellaneous(this.HDesc);  
   }


   ProcessData(ProcessD :string)
   {
   
    this.model.Process=ProcessD;

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
       Code:data.Code,
       TypeId:data.TypeId,
       Description:data.Description,   
       ShortDescription: data.ShortDescription,
       Activeyn:data.Activeyn              
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

export class ListItemSimplified {
  TypeId: string;          
  Description: string;         
}
