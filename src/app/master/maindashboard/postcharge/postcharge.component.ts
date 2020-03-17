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
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  Branch: string;
  Roomadvanceform: FormGroup;
  submitted = false;
  catagerys:any;
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

    this._masterservice.getrevenudata(this.Branch).subscribe(res => {
      this.catagerys = res;
    });


  }

}
