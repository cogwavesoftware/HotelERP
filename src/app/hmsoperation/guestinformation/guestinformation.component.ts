 import {
  HostListener, Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation,ViewChild, ElementRef, SimpleChanges, OnChanges 
} from "@angular/core"; 
import { Observable, Observer, empty, fromEvent } from "rxjs";
import { NgForm } from "@angular/forms";
import { AgGridAngular } from 'ag-grid-angular'; 
import { FormBuilder, FormGroup, FormArray, FormControl,ValidatorFn,Validators} from "@angular/forms";
import { animate, style, transition, trigger } from "@angular/animations";
import { MasterformService } from "src/app/_services/masterform.service";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common"; 
import { BankService } from 'src/app/_services/bank.service';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam'; 
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-guestinformation',
  templateUrl: './guestinformation.component.html',
  styleUrls: ['./guestinformation.component.scss']
})
export class GuestinformationComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  private gridColumnApi;
  private defaultColDef;
  private groupDefaultExpanded;
  private columnDefs;
  private columnTypes;
  private rowData: any;
  private rowSelection: any;
  title = 'app';
  public data: Observable<any>;
  model: any = {};
  form: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  timepicker: Partial<TimepickerConfig>;
  planlist = [];
  minDate: Date; 
  myTime = new Date();
  back = false;
  maxDate = new Date();
  Id$: Observable<string>; 
  valid: boolean = true;
  private selectedRows = [];
  isValid(event: boolean): void {
    this.valid = event;
  }
  constructor(private datePipe: DatePipe, private fb: FormBuilder, private renderer: Renderer2,
    public formBuilder: FormBuilder, private _bankservice: BankService, private http: HttpClient,
    private _masterservice: MasterformService,private _masterformservice: MasterformService,private _ipservice: IpserviceService  ) {
      this.minDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 1);

      this.form = this.formBuilder.group({
        guestname: ["", [Validators.required]],
        checkindate: [new Date(), [Validators.required]],  
        arrdate: [new Date(), [Validators.required]],
        arrtime: [this.myTime, [Validators.required]], 
        checkinno: ["", [Validators.required]], 
        planid: ["", [Validators.required]],
        companyname: ["", [Validators.required]],
        gstno: ["", [Validators.required]],
        bid: ["", [Validators.required]] ,
        linkcompany: ["", [Validators.required]] ,
        roomno: ["", [Validators.required]] 
      });
      this.columnDefs = [
        { headerName: 'Days', field: 'RNO', sortable: true, filter: true },
        { headerName: 'Sampletex1', field: 'Tarriff', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex2', field: 'Operation1', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex3', field: 'Type1', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex4', field: 'Operation2', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex5', field: 'Type2', sortable: true, filter: true, editable: false } 
      ]; 
    }

  ngOnInit() {
    
  }
  onGridReady(params) {
    this.rowData = this._masterformservice.GetAllTaxRule();
    console.log(params); 
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(this.gridColumnApi)
    params.api.sizeColumnsToFit();
  //   setTimeout(()=>{
  //     let SelIds=this.RulId;
  //     this.gridApi.forEachNodeAfterFilter(function(node) {  
  //       node.setSelected(node.data.RNO ===SelIds); 
  //     });
  //  }, 1000);
     
    
  }

  onRowClicked(event){
    console.log("jai");
    console.log(event.data); 
  }

}
