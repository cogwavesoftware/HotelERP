import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs"; 
import { IpserviceService } from "src/app/_services/ipservice.service";

import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
import { MasterformService } from 'src/app/_services/masterform.service';
@Component({
  selector: 'app-setcompliment',
  templateUrl: './setcompliment.component.html',
  styleUrls: ['./setcompliment.component.scss']
})
export class SetcomplimentComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  model: any = {};   
  Branch:string;
  filterdata:any;
  emailFormArray: Array<any> = [];
  @ViewChild("f", { static: false }) form: any;  
  categories: any[];
  constructor(private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService) {
      this.Branch= localStorage.getItem("BranchCode");
   }

  ngOnInit() {    

    this.data = this._masterformservice.getrevenudata(this.Branch);

    this._masterformservice.getrevenudata(this.Branch).subscribe(data=>{
      this.filterdata=data;
    });
     
     this._masterformservice.getothertax(this.Branch).subscribe((data: any) => {
       data.forEach(obj => (obj.selected = false));
       this.categories = data;
       console.log(this.categories);
     }); 
 
  }
  
  onSubmit(form?: NgForm) {  
    alert("jai");
    console.log("form value " + form.value);  
    console.log("array value "+ this.emailFormArray);
  }

  onChange(ids: number, isChecked: boolean) {
    if (isChecked) {
      this.emailFormArray.push(ids);
    } else {
      let index = this.emailFormArray.indexOf(ids);
      this.emailFormArray.splice(index, 1);
    }
  } 
 
  closeMyModalPin(event) { 
    var openModals = document.querySelectorAll(".md-show");
    for (let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show");
    }
  }

}
