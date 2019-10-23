import { Component, OnInit , ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';


@Component({
  selector: 'app-plancreation',
  templateUrl: './plancreation.component.html',
  styleUrls: ['./plancreation.component.scss']
})
export class PlancreationComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  catageryhasError:boolean;
  public isShown:boolean = false;
  model: any = {};
  btitle:string="Add";
  isValid:boolean;
  //catagerys=['Room','Hall'];
  dtat:string;
  title: string;
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  isroomt:string;
  isroomc:string;
  ipAddress:string;
  catagerys:any;
  roles : any[];
  @ViewChild('f',{static:false}) form: any;
  constructor(private _masterformservice:MasterformService,private _ipservice:IpserviceService) { }

  ngOnInit() {
    this.btitle="Add Item"
  // this.data = this._masterformservice.GetBankdetails()
  
  this.model.BranchCode=localStorage.getItem('BranchCode');
  this.model.IpAdd=localStorage.getItem('LOCAL_IP');
  this.model.CreatedBy=localStorage.getItem('id');
 
   this.model.catagery="default";
   if(!this.model.BranchCode)
   {
     this.data = this._masterformservice.getallplanopr('CW_1001')
   }
   else
   {
     this.data = this._masterformservice.getallplanopr(this.model.BranchCode)
   }

   this._masterformservice.getplan().subscribe(res=>{
     this.catagerys=res;
   })

   this._masterformservice.getothertax('CW_1001').subscribe(
    (data : any)=>{
      data.forEach(obj => obj.selected = false);
      this.roles = data;
      console.log(this.roles)
    }
  );
 
  }


  validateplan(value) {
    if (value === 'default') {
      this.catageryhasError = true;
    } else {
      this.catageryhasError = false;
    }
  }

  getIP()
  {
    this._ipservice.getIpAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      console.log(this.ipAddress)
    });
  }


  Showhide()
  {
   this.resetForm();
   
   if (this.btitle=="Hide Form"){
    this.isShown = false;
    this.btitle="Add Item"}
   else{    
    this.isShown = true; 
    this.btitle="Hide Form"
    }
    
  }


  resetForm(form?: NgForm)
  {
     this.model = {
      Id: 0,
      PlanName:null,
      TaxId:null,
      PlanAmount:null,      
      BranchCode:localStorage.getItem('BranchCode'),
      IpAdd:localStorage.getItem('LOCAL_IP'),
      CreatedBy:localStorage.getItem('id'),
    };  
  }
  openMyModalData(event) {
    // CreatedBy
    //IpAdd
     this.btitle="Hide Form"    
     this.isShown = true;
     this.data.subscribe(response => {
       this.model.Id=response[event]['Id'];
       this.model.PlanName=response[event]['PlanName'];
       this.model.TaxId=response[event]['TaxId'];
       this.model.PlanAmount=response[event]['PlanAmount'];       
     });
   
   }
   onSubmit()
   {

    var x = this.roles.filter(x => x.selected).map(y => y.TaxName);

    console.log(x);
     console.log(this.form.value);          
     if (this.form.valid)
     {
       console.log("Form Submitted!");    
     }     
   }
   Closeform() 
   {       
       this.resetForm();        
   }
   
  openMyModal(event,data) 
  {
    this.model = {  
      Id:data.Id,
      PlanName:data.PlanName,
      TaxId: data.TaxId,
      PlanAmount :data.PlanAmount      
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
