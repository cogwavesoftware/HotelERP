
import { Component, OnInit, ViewChild, SimpleChanges, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { RoomtypeService } from 'src/app/_services/roomtype.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty'
@Component({
  selector: 'app-taxrule',
  templateUrl: './taxrule.component.html',
  styleUrls: ['./taxrule.component.scss']
})
export class TaxruleComponent implements OnInit {
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
  public data1: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public isShown: boolean = true;
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
  RulId:string;
  @ViewChild('f', { static: false }) form: any;
  constructor(private http: HttpClient, private _masterformservice: MasterformService,
    private _roomtypeservice: RoomtypeService, private toastyService: ToastyService,
    private _ipservice: IpserviceService) {
    this.columnDefs = [
      { headerName: 'Select', field: 'Select', sortable: true, filter: true, checkboxSelection: true },
      { headerName: 'RNO', field: 'RNO', sortable: true, filter: true },
      { headerName: 'Tarriff', field: 'Tarriff', sortable: true, filter: true, editable: false },
      { headerName: 'Operation1', field: 'Operation1', sortable: true, filter: true, editable: false },
      { headerName: 'Type1', field: 'Type1', sortable: true, filter: true, editable: false },
      { headerName: 'Operation2', field: 'Operation2', sortable: true, filter: true, editable: false },
      { headerName: 'Type2', field: 'Type2', sortable: true, filter: true, editable: false }
      
    ];
    this.Branch = localStorage.getItem("BranchCode");

  }
  ngOnInit() {  
    this.resetForm();
    this.btitle = "Add Item";
    this.data = this._masterformservice.GetRuledApplicable(this.Branch);
    this.data.subscribe(data=>
    {
      this.RulId=data[0].TaxRuleId;
      console.log(this.RulId);
    });
  }


 


  /* ag grid code starting */
  onSelectionChanged() { 
   
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    this.str = JSON.stringify(selectedRows);
  }
  onGridReady(params) {
    this.rowData = this._masterformservice.GetAllTaxRule();
    console.log(params);
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(this.gridColumnApi)
    params.api.sizeColumnsToFit();
    setTimeout(()=>{
      let SelIds=this.RulId;
      this.gridApi.forEachNodeAfterFilter(function(node) { 
        
        node.setSelected(node.data.RNO ===SelIds);
        
      });
   }, 1000);
     
    
  }

  /* ag grid code ending */
 
  selectAllAmerican() {
    let SelId=this.RulId;
    this.gridApi.forEachNodeAfterFilter(function(node) { 
      node.setSelected(node.data.RNO ===SelId);
      //node.setSelected(true)
    });

  }

 


  Showhide() {
    //this.resetForm();
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

    this.model.BranchCode = localStorage.getItem("BranchCode")
    this.model.CreatedBy = localStorage.getItem("id")
    this.model.ModifyBy = localStorage.getItem("id")
    this.model.IpAdd = localStorage.getItem("LOCAL_IP")
    //this.form.value.companytariff = JSON.parse(this.str);
    //console.log(1)
    console.log(this.form.value.companytariff)

    console.log("JSON")
    var sdata = JSON.parse(this.str);
    console.log(sdata)
    
    var ChangedId=sdata[0].RNO;
    console.log(ChangedId)
    this.model.TaxId=ChangedId;

    if (ChangedId == this.RulId) {
      this.addToast("Cogwave Software", "Tax Ruke already Exist ", "warning");
      return;
    }
    
    // if (form.invalid) {
    //   console.log(form.value);
    //   this.addToast("Cogwave Software", "invalid Data", "warning");
    //   return;
    // }
    
    

    this._masterformservice.SaveCompany(this.model).subscribe(data => {
      if (data == true) {
        
          this.addToast(
            "Cogwave Software",
            "Tax Rule  Saved Sucessfully",
            "success"
          );
          form.reset({
            BranchCode: localStorage.getItem("BranchCode"), 
          });
          this.isShown = true;
        
      } else {
        this.addToast("Cogwave Software", "Tax Rule Not Saved", "error");
        form.reset({
          BranchCode: localStorage.getItem("BranchCode"),
        });
        this.isShown = true;
      }
    });

    this.data = this._masterformservice.GetRuledApplicable(this.Branch);
    this.data.subscribe(data=>
    {
      this.RulId=data[0].TaxRuleId;
      console.log(this.RulId);
    });
    this.rowData = this._masterformservice.GetAllTaxRule();

   
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