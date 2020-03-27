import { OperationService } from './../../../_services/operation.service';
import { Component, OnInit,Input, ViewChild,Renderer2 } from '@angular/core';
import {  FormBuilder,  FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
 import { Router, ActivatedRoute } from "@angular/router";
 import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-postcharge',
  templateUrl: './postcharge.component.html',
  styleUrls: ['./postcharge.component.scss']
})
export class PostchargeComponent implements OnInit {
  form: FormGroup;
  model:any;
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  Branch: string;
  Roomadvanceform: FormGroup;
  submitted = false;
  catagerys:any;
  codeList = [
    { id: 1, name: 'Item1' },
    { id: 2, name: 'Item2' },
    { id: 3, name: 'Item3' },
    { id: 4, name: 'Item4' },
    { id: 5, name: 'Item5' }
  ];

  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  constructor( 
    public router: Router,   private renderer: Renderer2,
    public formBuilder: FormBuilder,private _oprservice:OperationService, 
    private route: ActivatedRoute,
    private _masterservice: MasterformService )            
     {
      this.Branch="CW_1001" 
     }
   

  ngOnInit() {
    this.model={
      Id:0,
      BranchCode:0,
      IpAdd:1,
      CreatedBy:1,
      RoomNo:0,
      RoomCode:0,
      Revenu:0,
      grand:0,
      tax:0,
      tarif:0,
      revname:'',
      stward:'',
      taxvalue:'',
      SRoomNo:"select"
    } 
    this._masterservice.getrevenudata(this.Branch).subscribe(res => {
      this.catagerys = res;
    }); 
    this.form = this.formBuilder.group({ 
      PayExtra: this.formBuilder.array([]),
      roomno: ['', Validators.required],
      roomcode:['', Validators.required],
      guestname:['', Validators.required],
      stward:['',Validators.required],
      revname:['',Validators.required],
      taxvalue:['',Validators.required]
    });
     

  }
  /* below code for auto search in dropdownlist */
  public saveCode(e): void {
    let name = e.target.value;
    let list = this.codeList.filter(x => x.name === name)[0];
    console.log(list.name);
    console.log(list.id);
  }
  /* end below code for auto search in dropdownlist */

  AddExtraChargeGrid(): FormGroup {
    return this.formBuilder.group({ 
      itemname: [],
      Amount: [],
      TaxAmount: [],
      TotalAmount: []
    });
  }
  AddExtrachargeButtonClick(): void {
    (<FormArray>this.form.get("PayExtra")).push(this.AddExtraChargeGrid());
  }
  closeMyModalPin(event){ 
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    } 
  }


}
