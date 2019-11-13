import { id } from "@swimlane/ngx-datatable/release/utils";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { CompanyService } from "../../_services/company.service";
import { environment } from "src/environments/environment";
import { companymodel } from "src/app/_models/companymodel";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

// export class companymodel {
//   Id: number;
//   ClientName: any;
//   ClientAddress: string;
//   MobileNo: string;
//   EmailId: string;
//   Trdate: any;

// }
// export class CrmContact {
//   id: number;
//   image: any;
//   name: string;
//   email: string;
//   position: string;
//   office: string;
//   age: number;
//   phone_no: string;
//   date: any;
// }

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: [
    "./company.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
  public data: Observable<companymodel>;

  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";

  public Id: number;
  public ClientName: string;
  public ClientAddress: string;
  public MobileNo: string;
  public EmailId: string;
  public Trdate: string;
  isValid: boolean;
  model: any = {};
  public isShown: boolean = false;
  @Input("modalDefault") modalDefault: any;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  btitle: string;
  closeOther = false;
  mode: string;
  formfilter: any;
  IsExistdata: boolean = false;
  
  constructor(
    public httpClient: HttpClient,
    public _companyservice: CompanyService,
    public router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,

    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.resetForm();
    this.btitle = "Add Item";
    this.model.Trdate = this.datePipe.transform(
      this.model.Trdate,
      "dd-MM-yyyy"
    );
    console.log(this.model.Trdate); //output - 14-02-2019
    this.btitle = "Add Item";
    this.data = this._companyservice.getcompanydata();
    console.log(this.data);
    
    this._companyservice.getcompanydata().subscribe((data: any) => {
      this.formfilter = data;
    });

    this.mode = "(List)";
  }

  openMyModal() {
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

  openMyModalDataview(event, data) {
    this.model = {
      Id: data.Id,
      ClientName: data.ClientName,
      ClientAddress: data.ClientAddress,
      MobileNo: data.MobileNo,
      EmailId: data.EmailId
    };
    document.querySelector("#" + event).classList.add("md-show");
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

  openMyModalData(event) {
    this.btitle = "Hide Form";
    this.isShown = true;
    this.mode = "(Edit)";
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.ClientName = response[event]["ClientName"];
      this.model.ClientAddress = response[event]["ClientAddress"];
      this.model.MobileNo = response[event]["MobileNo"];
      this.model.EmailId = response[event]["EmailId"];
      this.model.Trdate = response[event]["Trdate"];
    });
  }

  CallKeytype(companyname: string) {
    this.IsExistdata = this.formfilter.find(ob => ob.ClientName == companyname)
      ? true
      : false;
  }
  // OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
  resetForm(form?: NgForm) {
    if ((form = null)) this.isShown = false;
    this.model.Id = null;
    this.model.ClientName = "";
    this.model.ClientAddress = "";
    this.model.MobileNo = "";
    this.model.EmailId = "";
    this.model.Trdate = null;
  }

  closepopup() {
    this.btitle = "Add Item";
    this.isShown = false;
  }

  closeMyModal(event) {
    this.mode = "(List)";
    this.btitle = "Add Item";
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }

  onSubmit(form?: NgForm) {
    if (this.IsExistdata == true) {
      this.addToast(
        "Cogwave Software",
        "Company name Allready Exist",
        "warning"
      );

      return;
    }
    this._companyservice.SaveCompanyData(this.model).subscribe(
      data => {
        if (data == true) {
          if (this.model.id > 0) {
            this.addToast(
              "Cogwave Software",
              "Company Data Saved Sucessfully",
              "success"
            );
          } else {
            this.addToast(
              "Cogwave Software",
              "Companydetail Updated Sucessfully",
              "success"
            );
          }
        } else {
          this.addToast("Cogwave Software", "Company Data Not Saved", "error");
        }
      },
      error => {
        let currenterror = JSON.stringify(error.error.error_description);
        console.log(currenterror);
        this.addToast("Cogwave Software😃", currenterror + "👊", "error");
      }
    );
    this.isShown = false;
    this.resetForm();
    this.ngOnInit();
  }

  validateForm() {
    this.isValid = true;
    if (this.model.ClientName == null) this.isValid = false;
    return this.isValid;
  }
}
