import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';

import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'


@Component({
  selector: 'app-roomboy',
  templateUrl: './roomboy.component.html',
  styleUrls: ['./roomboy.component.scss']
})
export class RoomboyComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public isShown:boolean = false;
  model: any = {};
  btitle:string="Add";
  isValid:boolean;

  dtat:string;
  title: string;
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  isroomt:string;
  isroomc:string;
  ipAddress:string;
 
  mode: string;
  Branch: string;
  filterdata: any;
  IsExistdata: boolean;
  @ViewChild('f',{static:false}) form: any
  constructor(private _masterformservice:MasterformService,
    private toastyService: ToastyService,
    private _ipservice:IpserviceService) {
      this.Branch= localStorage.getItem("BranchCode");
     }

  ngOnInit() {
    this.resetForm();
    this.btitle = "Add Item";
    this.mode = "(List)";
    this.data = this._masterformservice.GetSwardDetail(this.Branch);
  }
  
  // getIP()
  // {
  //   this._ipservice.getIpAddress().subscribe((res:any)=>{
  //     this.ipAddress=res.ip;
  //     console.log(this.ipAddress)
  //   });
  // }
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
      Id: 0,
      DoB:null,   
      StwardName:null,
      Address:null,
      Nation:null,
      Mobile:null,
      Email:null,
      IsActive:null,  
    };  
  }

  openMyModalData(event) {
   
     this.btitle="Hide Form"    
     this.isShown = true;
     this.data.subscribe(response => {
       this.model.Id=response[event]['Id'];
       this.model.StwardName=response[event]['StwardName'];   
       this.model.Address=response[event]['Address'];   
       this.model.Nation=response[event]['Nation'];   
       this.model.Mobile=response[event]['Mobile'];   
       this.model.Email=response[event]['Email'];       
       this.mode = "(Edit)" + this.model.StwardName;
     });
   
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
    //   this.addToast("Cogwave Software", "Name already Exist ", "warning");
    //   return;
    // }

    this._masterformservice.SaveStwardDetails(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            " Data Saved Sucessfully",
            "success"
          );
          form.reset({
            Id: "0",
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode")
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "Data Not Saved", "error");
        form.reset({
          Id: "0",
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
        });
        this.isShown = true;
      }
    });

    this.data = this._masterformservice.GetSwardDetail(this.Branch);
    console.log(this.data);
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
      Id:data.Id,
      DoB:data.DoB,   
      StwardName: data.StwardName,
      Address:data.Address,
      Nation:data.Nation,
      Mobile:data.Mobile,
      Email:data.Email,
      IsActive:data.IsActive 
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
