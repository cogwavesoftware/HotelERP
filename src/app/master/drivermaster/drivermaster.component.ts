
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
@Component({
  selector: 'app-drivermaster',
  templateUrl: './drivermaster.component.html',
  styleUrls: ['./drivermaster.component.scss']
})
export class DrivermasterComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";
  isValid: boolean;
  IsExistdata:boolean;
  position = 'top-right';
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
  mode: string;
  Branch:string;
  filterdata:any;
  itemss:any;
  UserId:string;
  public showloader  ="false;";
  @ViewChild("f", { static: false }) form: any;
  constructor(
    private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService
  ) {
    this.Branch= localStorage.getItem("BranchCode");
    this.UserId=localStorage.getItem('id');
  }

  ngOnInit() {


    this.resetForm();
    this.btitle = "Add Item";
    this.mode = "(List)";
    if (!this.Branch) {
      this.data = this._masterformservice.GetDriverMaster("CW_1001");
    } else {
      this.data = this._masterformservice.GetDriverMaster(this.Branch);
    }
  
    this._masterformservice.GetDriverMaster(this.Branch).subscribe((data: any) => {
      this.filterdata = data;
    });


  }

  getIP() {
    this._ipservice.getIpAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress);
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

  resetForm(form?: NgForm) {
    this.model = {
      DriverId: 0,
      DriverName: null,
      MobileNo: null,
      VechileNo: null,
      Address: null,
      BranchCode:this.Branch,
      CreatedBy:this.UserId
    };
  }


  CallKeytype() {
    let datas = this.filterdata.find(
      ob => ob.Name == this.form.value.Name
    );
    if (datas == undefined) {
      this.IsExistdata = false;
    } else {
      this.IsExistdata = true;
    }
  }


  openMyModalData(event) {
    // CreatedBy
    //IpAdd
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.DriverId = response[event]["DriverId"];
      this.model.DriverName = response[event]["DriverName"];
      this.model.MobileNo = response[event]["MobileNo"];
      this.model.VechileNo = response[event]["VechileNo"];
      this.model.Address = response[event]["Address"]; 
      this.model.BranchCode = response[event]["BranchCode"];
      // this.model.IpAdd = response[event]["IpAdd"];
      // this.model.ModifyBy = response[event]["ModifyBy"];
      this.mode = "(Edit)"+  this.model.DriverName;
    });
  }




  onSubmit(form?: NgForm) {
  

    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id")
    form.value.ModifyBy = localStorage.getItem("id")
    form.value.IpAdd = localStorage.getItem("LOCAL_IP")

   
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "Invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "Driver already Exist ", "warning");
      return;
    }


    console.log(form.value)
    console.log('form.value')
    
    this._masterformservice.SaveDriverMaster(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.DriverId == "0") {
          this.addToast(
            "Cogwave Software",
            "Bank Data Saved Sucessfully",
            "success"
          );
          form.reset({
            BranchCode: this.Branch,
            DriverId: "0"
          });
          this.isShown = true;
          this.data = this._masterformservice.GetDriverMaster(this.Branch);

        } else {
          this.addToast(
            "Cogwave Software",
            "Driver Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
          this.data = this._masterformservice.GetDriverMaster(this.Branch);

        }
      } else {
        this.addToast("Cogwave Software", "Driver Data Not Saved", "error");
        form.reset({
        
          BranchCode:this.Branch,
          DriverId: "0"
        });
        this.isShown = true;
      }
    });

    
    this._masterformservice.GetDriverMaster(this.Branch).subscribe((data: any) => {
      this.filterdata = data;
    });
  }



  Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.mode = "(List)";
  }
  openMyModal(event, data) {
    this.model = {
      DriverId: data.DriverId,
      DriverName: data.DriverName,
      MobileNo: data.MobileNo,
      VechileNo: data.VechileNo,
      Address: data.Address,
    
      
    };
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
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

