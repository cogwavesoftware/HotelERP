import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { RoomtypeService } from 'src/app/_services/roomtype.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-roomtypecreation',
  templateUrl: './roomtypecreation.component.html',
  styleUrls: ['./roomtypecreation.component.scss']
})
export class RoomtypecreationComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public isShown:boolean = false;
  model: any = {};
  topicHasError = true;
  Roomtyeps=['Ac','NonAc'];
  catagerys=['Room','Hall'];
  catageryhasError=true; 
  btitle:string="Add";
  
  isValid:boolean;

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
  constructor(private _roomtypeservice:RoomtypeService) { }
   
  ngOnInit() {
    this.model.topic="default";
    this.model.catagery="default";
    
    this.btitle="Add Item"
   this.data = this._roomtypeservice.GetRoomType()
    console.log(this.data)
  }


  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  validateroom(value) {
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
    this.btitle="Hide Form"}
    this.model.topic="default";
    this.model.catagery="default";
  }
  
  resetForm(form?: NgForm){
     this.model = {
      RNo: null,
      RoomCode: '',
      RoomName: null,
      TotalRooms :null,
      IsAcRoom : null,
      ChannelRoomCode :null,
      IsRoom : null,
      SingleRate :null, 
      DoubleRate : null, 
      TribleRate : null, 
      QuadRate : null, 
      Fivth : null,
      Sixth :null, 
      ExtraAdult : null, 
      ExtraChild : null, 
      IsActive : null, 
      Seventh : null,
      Eighth :null, 
      Nineth : null, 
      Tenth : null, 
      Defaultpax : null, 
      Defaultrate : null,
    };  
  }

  openMyModalData(event) {

    this.btitle="Hide Form"
     
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.RoomCode=response[event]['RoomCode'];
      this.model.RoomName=response[event]['RoomName'];
      this.model.TotalRooms=response[event]['TotalRooms'];
      
      this.model.ChannelRoomCode=response[event]['ChannelRoomCode'];
      
      this.model.SingleRate=response[event]['SingleRate'];
      this.model.DoubleRate=response[event]['DoubleRate'];
      this.model.TribleRate=response[event]['TribleRate'];
      this.model.QuadRate=response[event]['QuadRate'];
      this.model.Fivth=response[event]['Fivth'];
      this.model.Sixth=response[event]['Sixth'];


      this.model.ExtraAdult=response[event]['ExtraAdult'];
      this.model.ExtraChild=response[event]['ExtraChild'];
      this.model.IsActive=response[event]['IsActive'];

      this.model.Seventh=response[event]['Seventh'];
      this.model.Eighth=response[event]['Eighth'];
      this.model.Nineth=response[event]['Nineth'];
      this.model.Tenth=response[event]['Tenth'];
      this.model.Defaultpax=response[event]['Defaultpax'];
      this.model.Defaultrate=response[event]['Defaultrate'];

      this.model.IsAcRoom=response[event]['IsAcRoom'];
      this.model.IsRoom=response[event]['IsRoom'];

      this.isroomt=response[event]['IsAcRoom'];
     
      this.isroomc=response[event]['IsRoom'];

      console.log(this.isroomt)
      console.log(this.isroomc)
      if(this.isroomt="true")
      {
        this.model.topic="Ac";
      }
      else
      {
        this.model.topic="NonAc";
      }
      if(this.isroomc="true")
      {
        this.model.catagery="Room";
      }
      else{
        this.model.catagery="Hall";
      }
 
    });
    
  }

  onSubmit()
  {
    console.log(this.model)
  }


  Closeform() {
      this.isShown = false;
      this.btitle="Add Item"  
      this.resetForm();  
      this.model.topic="default";
      this.model.catagery="default";
  }


  openMyModal(event,data) 
  {
    this.model = {  
      RoomCode:data.RoomCode,
      SingleRate:data.SingleRate,
      DoubleRate: data.DoubleRate,
      TribleRate :data.TribleRate,
      QuadRate : data.QuadRate,
      Fivth:data.Fivth,
      IsActive :data.IsActive,
      BranchCode : data.BranchCode,  
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
