import { MasterformService } from './../../../_services/masterform.service';
import { ChangePlanFormmodel } from './../../../_models/ChangePlanFormmodel';

import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { Commonmodel } from './../../../_models/Commonmodel';
import { EditPaxRateFormmodel } from 'src/app/_models/EditPaxRateFormmodel';
import { AmendRoommodel } from './../../../_models/AmendRoommodel';

import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-changeplan',
  templateUrl: './changeplan.component.html',
  styleUrls: ['./changeplan.component.scss']
})
export class ChangeplanComponent implements OnInit {
  timepicker: Partial<TimepickerConfig>;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  minDate=new Date();
  catagerys:any;
  @Input() changeplanformmodel :ChangePlanFormmodel
  constructor(private toastyService: ToastyService,private datePipe: DatePipe,
     private _masterformservice: MasterformService,
    private _oprservice:OperationService) { }


  ngOnInit() {

    this._masterformservice.getplan().subscribe(res => {
      this.catagerys = res;
    });

    this.changeplanformmodel={
      RoomNo:"0",
      GuestName:"0",
      BranchCode:"0",
      Plan:"0",
      CPlan:"0",
      CreatedBy:0,
    }
  }

}
