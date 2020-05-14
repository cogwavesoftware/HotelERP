import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { AuthenticationService } from './../../_services/authentication.service';

@Component({
  selector: 'app-drivermaster',
  templateUrl: './drivermaster.component.html',
  styleUrls: ['./drivermaster.component.scss']
})
export class DrivermasterComponent implements OnInit {
  public data: Observable<any>;
  @ViewChild("f", { static: false }) form: any;
  model: any = {};
  Branch:string;
  constructor(private _masterformservice: MasterformService,private _authenservice: AuthenticationService) { }

  ngOnInit() {
    this.Branch= localStorage.getItem("BranchCode");
  }
  onSubmit(form?: NgForm) {
    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id")
    form.value.ModifyBy = localStorage.getItem("id")
    form.value.IpAdd = localStorage.getItem("LOCAL_IP")
  }

}
