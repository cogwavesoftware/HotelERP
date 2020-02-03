import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { RoomtypeService } from 'src/app/_services/roomtype.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty'
@Component({
  selector: 'app-companycreation',
  templateUrl: './companycreation.component.html',
  styleUrls: ['./companycreation.component.scss']
})
export class CompanycreationComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  distypeicHasError: boolean = false;
  private gridColumnApi;
  private defaultColDef;
  private groupDefaultExpanded;
  private columnDefs;
  private columnTypes;
  private rowData: any;
  private rowSelection: any;
  title = 'app';
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public isShown: boolean = false;
  public isAgGridshow: boolean = true;
  model: any = {};
  
  btitle: string = "Add";
  isValid: boolean;
  dtat: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  isroomt: string;
  isroomc: string;
  catageryhasError: boolean;
  public str;
  Distype = ['%', 'Amount'];
  companytype: any;
  mode: string;
  Branch: string;
  filterdata: any;
  IsExistdata: boolean;

  @ViewChild('f', { static: false }) form: any;
  constructor(private http: HttpClient, private _masterformservice: MasterformService,
    private _roomtypeservice: RoomtypeService, private toastyService: ToastyService,
    private _ipservice: IpserviceService) {
    this.columnDefs = [
      { headerName: 'Select', field: 'Select', sortable: true, filter: true, checkboxSelection: true },
      { headerName: 'RoomCode', field: 'RoomCode', sortable: true, filter: true },
      { headerName: 'Single', field: 'SingleRate', sortable: true, filter: true, editable: true, type: "valueColumn" },
      { headerName: 'Double', field: 'DoubleRate', sortable: true, filter: true, editable: true, type: "valueColumn" },
      { headerName: 'Trible', field: 'TribleRate', sortable: true, filter: true, editable: true, type: "valueColumn" },
      { headerName: 'QuadR', field: 'QuadRate', sortable: true, filter: true, editable: true, type: "valueColumn" },
      { headerName: 'Fivth', field: 'Fivth', sortable: true, filter: true, editable: true, type: "valueColumn" },
      { headerName: 'Sixth', field: 'Sixth', sortable: true, filter: true, editable: true, type: "valueColumn" },
      // {headerName: 'Seventh', field: 'Seventh', sortable: true, filter: true,editable:true,type: "valueColumn"},
      // {headerName: 'Eighth', field: 'Eighth', sortable: true, filter: true,editable:true,type: "valueColumn"},
      // {headerName: 'Nineth', field: 'Nineth', sortable: true, filter: true,editable:true,type: "valueColumn"},
      // {headerName: 'Tenth', field: 'Tenth', sortable: true, filter: true,editable:true,type: "valueColumn"},
      { headerName: 'Ex-Adult', field: 'ExtraAdult', sortable: true, filter: true, editable: true, type: "valueColumn" },
      { headerName: 'Ex-Child', field: 'ExtraChild', sortable: true, filter: true, editable: true, type: "valueColumn" }
    ];
    this.Branch = localStorage.getItem("BranchCode");

  }
  ngOnInit() {

    this.resetForm();
    this.btitle = "Add Item";
    
    console.log(this.rowData)
    this.data = this._masterformservice.GetRoomcomany(this.Branch);
    this._masterformservice.GetAllRoomCompanyType().subscribe(res => {
      this.companytype = res
    });
  }

  
  /* ag grid code starting */
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    this.str = JSON.stringify(selectedRows);
  }
  onGridReady(params) {
    this.rowData = this._roomtypeservice.GetRoomType(this.Branch);
    console.log(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(this.gridColumnApi)
    params.api.sizeColumnsToFit();
  }
  /* ag grid code ending */
  validateplan(value) {
    if (value === 'default') {
      this.catageryhasError = true;
    } else {
      this.catageryhasError = false;
    }
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
      CompanyCode: null,
      CompanyName: null,
      GSTNO: null,
      CompanyType: '-1',
      ContactName: null,
      MobileNo: null,
      Address: null,
      City: null,
      State: null,
      Country: null,
      Email: null,
      IsActive: true,
      Discount: null,
      discounttype: "default"
    };
  }

  openMyModalData(event) {
    this.btitle = "Hide Form"
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]['Id'];
      this.model.CompanyName = response[event]['CompanyName'];
      this.model.GSTNO = response[event]['GSTNO'];
      this.model.CompanyType = response[event]['CompanyType'];
      this.model.ContactName = response[event]['ContactName'];
      this.model.MobileNo = response[event]['MobileNo'];
      this.model.Address = response[event]['Address'];
      this.model.City = response[event]['City'];
      this.model.State = response[event]['State'];
      this.model.Country = response[event]['Country'];
      this.model.Email = response[event]['Email'];
      this.model.Status = response[event]['Status'];
      this.model.Discount = response[event]['Discount'];
      this.model.discounttype = response[event]['discounttype'];
      this.mode = "(Edit)" + this.model.CompanyName;
    });
  }


  onSubmit(form?: NgForm) {

    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id")
    form.value.ModifyBy = localStorage.getItem("id")
    form.value.IpAdd = localStorage.getItem("LOCAL_IP")
    this.form.value.companytariff = JSON.parse(this.str);
   
    var sdata = JSON.parse(this.str);
   
   

    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "CompanyName already Exist ", "warning");
      return;
    }
    this._masterformservice.SaveCompany(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Company Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode"),
            Id: "0",
            discounttype: "default",
            CompanyType: '-1',
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "Company Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "Company Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          Id: "0",
          discounttype: "default",
          CompanyType: '-1',
        });
        this.isShown = true;
      }
    });

    this.rowData = this._roomtypeservice.GetRoomType(this.Branch);
    this.data = this._masterformservice.GetRoomcomany(this.Branch);
    this._masterformservice.GetAllRoomCompanyType().subscribe(res => {
      this.companytype = res
    });

  }


  Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.mode = "(List)";
  }

  validatediscount(value) {
    if (value === "default") {
      this.distypeicHasError = true;
    } else {
      this.distypeicHasError = false;
    }
  }

  openMyModal(event, data) {
    this.model = {
      Id: data.Id,
      CompanyCode: data.CompanyCode,
      CompanyName: data.CompanyName,
      GSTNO: data.GSTNO,
      CompanyType: data.CompanyType,
      ContactName: data.ContactName,
      MobileNo: data.MobileNo,
      Address: data.Address,
      City: data.City,
      State: data.State,
      Country: data.Country,
      Email: data.Email,
      Status: data.Status,
      Discount: data.Discount
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


} // end





// selectedRows.forEach(function(selectedRow, index) {
    //   if (index !== 0) {
    //     selectedRowsString += "* ";
    //   }
    //   selectedRowsString += selectedRow.make;
    // });
  // document.querySelector("#selectedRows").innerHTML = str;   