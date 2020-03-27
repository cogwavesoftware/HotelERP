
import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { ChangeCompanymodel } from 'src/app/_models/ChangeCompanymodel';

@Component({
  selector: 'app-changecompany',
  templateUrl: './changecompany.component.html',
  styleUrls: ['./changecompany.component.scss']
})
export class ChangecompanyComponent implements OnInit {
   @Input() RoomCode: string;
   @Input() RoomNo: string;
   @Input() changecompanyform:ChangeCompanymodel;
  Branch: string;
  submitted = false;
  subpaymodelist:any;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  companylist:any;
  model:any;
  constructor(  
    public router: Router,
    private _oprservice:OperationService,
    private toastyService: ToastyService, 
    private route: ActivatedRoute, 
    private _masterservice: MasterformService ) {
      this.Branch="CW_1001"    
      
     }
 

  ngOnInit() {
    this.changecompanyform={
      BranchCode: "0",
      CreatedBy: 0,
      RoomNo: "0",
      RoomCode: "0",
      CompanyId:"0",
      IsCompanyTrif:"NO",
      TarifAmount: 0,
      Reason: "0",
      
      }    
      this._masterservice.GetRoomcomany(this.Branch).subscribe(res=>{
        this.companylist=res;
      });


  }


  SaveChangeCompany(form?: NgForm) {
    console.log('form.value')
    console.log(form.value)
    // form.value.BranchCode = localStorage.getItem("BranchCode")
    // form.value.CreatedBy = localStorage.getItem("id")
    // form.value.ModifyBy = localStorage.getItem("id")
    // form.value.IpAddress = localStorage.getItem("LOCAL_IP")
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

   
    this._oprservice.SaveChangeCompany(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "ExtraBed Saved Sucessfully",
            "success"
          );
        form.reset();              
        } else {
          this.addToast(
            "Cogwave Software",
            "ExtraBed Data Updated Sucessfully",
            "success"
          );
          form.reset();           
        }
      } else {
        this.addToast("Cogwave Software", "ExtraBed Data Not Saved", "error");
       
      }
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


}
