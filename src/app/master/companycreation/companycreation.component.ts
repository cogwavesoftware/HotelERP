import { Component,OnInit ,ViewChild,SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';

@Component({
  selector: 'app-companycreation',
  templateUrl: './companycreation.component.html',
  styleUrls: ['./companycreation.component.scss']
})
export class CompanycreationComponent implements OnInit {
  @ViewChild('agGrid',{static: false }) agGrid: AgGridAngular;
  private gridApi;
  private gridColumnApi;   
  private defaultColDef;   
  private groupDefaultExpanded;
  private columnDefs;
  private columnTypes;
  private rowData:any;
  private rowSelection:any;
  title = 'app';

  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public isShown:boolean = false;
  public isAgGridshow:boolean=false;
  model: any = {};   
  btitle:string="Add";
  
  isValid:boolean;
 

  dtat:string;   
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  isroomt:string;
  isroomc:string;
  catageryhasError:boolean;   
  catagerys=['Room','Hall'];
  public str;

  @ViewChild('f',{static:false}) form: any;
  constructor(private http: HttpClient,private _masterformservice:MasterformService,private _ipservice:IpserviceService) { 
    this.columnDefs = [
      {headerName: 'Make', field: 'make', sortable: true, filter: true,checkboxSelection: true },
      {headerName: 'Model', field: 'model', sortable: true, filter: true},
      {headerName: 'Price', field: 'price', sortable: true, filter: true,editable:true,type: "valueColumn"}
      // {headerName: 'Total', field:'total',valueGetter:'data.Qty * data.price',editable:true }
  ];
  }
  ngOnInit(){            
    console.log("init");           
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.btitle="Add Item";   
    this.model.BranchCode=localStorage.getItem('BranchCode');
    this.model.IpAdd=localStorage.getItem('LOCAL_IP');
    this.model.CreatedBy=localStorage.getItem('id');
     console.log(this.model.BranchCode)
     console.log(this.model.IpAdd)
     console.log(this.model.CreatedBy)  
     if(!this.model.BranchCode)
      {
        this.data = this._masterformservice.getothertax('CW_1001')
      }
      else
      {
        this.data = this._masterformservice.getothertax(this.model.BranchCode)
      }    
     console.log(this.data)
  }
/* ag grid code starting */
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
     this.str =  JSON.stringify(selectedRows);
         
  }
  onGridReady(params) {
    console.log("onGridReady");
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

 Showhide(){
  this.resetForm();
  if (this.btitle=="Hide Form"){
   this.isShown = false;
   this.btitle="Add Item"}
  else{    
   this.isShown = true; 
   this.btitle="Hide Form"
  }    
 }
 resetForm(form?: NgForm){
  this.model = {
    Id: 0,
    CompanyCode: null,
    TaxName: null,
    GSTNO: null ,
    CompanyType: null,
    ContactName: null,
    MobileNo: null,
    Address: null,
    City: null,
    State: null,
    Country: null,
    Email: null,
    Status: null,
    Discount: null,
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
     this.model.CompanyName = response[event]['CompanyName'];
     this.model.GSTNO=response[event]['GSTNO'];
     this.model.CompanyType=response[event]['CompanyType']; 
     this.model.ContactName=response[event]['ContactName'];      
     this.model.MobileNo=response[event]['MobileNo'];      
     this.model.Address=response[event]['Address'];      
     this.model.City=response[event]['City'];      
     this.model.State=response[event]['State'];      
     this.model.Country=response[event]['Country'];       
     this.model.Email=response[event]['Email'];
     this.model.Status=response[event]['Status'];
     this.model.Discount=response[event]['Discount'];     
   });
 
 }


onSubmit()
{
  console.log("submit data", this.model)
  console.log(this.form.value);
  console.log("agrid data "+this.str);
  this.isAgGridshow=true;
  if (this.form.valid)
  {
    console.log("Form Submitted!");   
  }
}


 Closeform() {
  this.resetForm(); 
   }
   openMyModal(event,data) 
   {
     this.model = {  
       Id:data.Id,
       CompanyCode:data.CompanyCode,
       CompanyName: data.CompanyName,
       GSTNO :data.GSTNO,
       CompanyType :data.CompanyType,
       ContactName :data.ContactName,
       MobileNo :data.MobileNo,
       Address :data.Address,
       City :data.City,
       State :data.State,
       Country :data.Country,
       Email :data.Email,
       Status :data.Status,
       Discount :data.Discount               
     };
     document.querySelector('#' + event).classList.add('md-show');
   }
   closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


} // end





// selectedRows.forEach(function(selectedRow, index) {
    //   if (index !== 0) {
    //     selectedRowsString += "* ";
    //   }
    //   selectedRowsString += selectedRow.make;
    // });
    // document.querySelector("#selectedRows").innerHTML = str;   