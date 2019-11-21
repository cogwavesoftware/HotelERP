import { Component, OnInit,ViewChild,SimpleChanges } from '@angular/core'; 
import {HttpClient} from '@angular/common/http'; 
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service'; 
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'


@Component({
  selector: 'app-guestcreation',
  templateUrl: './guestcreation.component.html',
  styleUrls: ['./guestcreation.component.scss']
})
export class GuestcreationComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";
  isValid: boolean;
  IsExistdata:boolean
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
  genderhasError:boolean;  
  gendertypes=['MALE','FEMALE'];
  @ViewChild("f", { static: false }) form: any;
  constructor(private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,private toastyService: ToastyService,
     ) { this.Branch= localStorage.getItem("BranchCode");}

  ngOnInit() {
    this.resetForm();
    this.btitle = "Add Item";
    this.mode = "(List)";
    if (!this.Branch) {
      this.data = this._masterformservice.GetBankdetails("CW_1001");
    } else {
      this.data = this._masterformservice.GetBankdetails(this.Branch);
    }
  
    this._masterformservice.GetBankdetails(this.Branch).subscribe((data: any) => {
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
      Id: 0,
      GuestTittle: null,
      Gender: null,
      GuestName: null,
      GuestAddress: null,
      City: null,
      State: null,
      Nation: null,
      MobileNo: true,
      Email: null,
      GSTNO: null,
      PANNO: true,
      GDOB: null,
      GDOA: true
    };
  }

  openMyModalData(event) {
    // CreatedBy
    //IpAdd
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.GuestTittle = response[event]["GuestTittle"];
      this.model.Gender = response[event]["Gender"];
      this.model.GuestName = response[event]["GuestName"];
      this.model.GuestAddress = response[event]["GuestAddress"];
      this.model.City = response[event]["City"];
      this.model.State = response[event]["State"];
      this.model.Nation = response[event]["Nation"];
      this.model.MobileNo = response[event]["MobileNo"];
      this.model.Email = response[event]["Email"];
      this.model.GSTNO = response[event]["GSTNO"];
      this.model.PANNO = response[event]["PANNO"];
      this.model.GDOB = response[event]["GDOB"];
      this.model.GDOA = response[event]["GDOA"];
      this.model.ModifyBy = response[event]["ModifyBy"];
      this.mode = "(Edit)"+  this.model.Name;
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
      Id: data.Id,
      GuestTittle: data.GuestTittle,
      Gender: data.Gender,
      GuestName: data.GuestName,
      GuestAddress: data.GuestAddress,
      City: data.City,
      State: data.State,
      Nation: data.Nation,
      MobileNo: data.MobileNo,
      Email: data.Email,
      GSTNO: data.GSTNO,
      PANNO: data.PANNO,
      GDOB: data.GDOB,
      GDOA: data.GDOA      
    };
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }
  validategender(value) {
    if (value === 'default') {
      this.genderhasError = true;
    } else {
      this.genderhasError = false;
    }
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
  onSubmit()
  {
    console.log(this.form.value);          
    if (this.form.valid)
    {
      console.log("Form Submitted!");    
    }     
  }

}
