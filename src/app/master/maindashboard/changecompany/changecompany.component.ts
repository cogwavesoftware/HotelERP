
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
  UserId:number;
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
      this.UserId=1
     }
 

  ngOnInit() {
    this.changecompanyform={
      BranchCode:this.Branch,
      CreatedBy:this.UserId,
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
    
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    this._oprservice.SaveChangeCompany(form.value).subscribe(data => {
      if (data == true) {
          this.addToast(
            "Cogwave Software Technologies Pvt Ltd..",
            "Congratulations Data Saved Sucessfully",
            "success"
          );               
      } 
      else {
        this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully", "error");
      }
    },
      error=>{
        this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully", "error");
      },
      ()=>{
      //  form.reset();
        this.closeMyModalPin(event)
      });

  }


  closeMyModalPin(event){ 
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    } 
    var maindashboard = document.querySelectorAll(".maindashboard"); 
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
