import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-roomtypecreation',
  templateUrl: './roomtypecreation.component.html',
  styleUrls: ['./roomtypecreation.component.scss']
})
export class RoomtypecreationComponent implements OnInit {

  model: any = {};
  topicHasError = true;
  Roomtyeps=['Ac','NonAc'];
  catagerys=['Room','Hall'];
  catageryhasError=true; 
  btitle:string="Add";
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  isValid:boolean;
  public isShown:boolean = false;
  dtat:string;
  title: string;
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  

  constructor() { }
   
  ngOnInit() {
    this.model.topic="default";
    this.model.catagery="default";
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
      RoomNo: '',
      RoomCode: '',
      RoomName: null,
      TotalRooms :null,
      IsAcRoom : null,
      ChannelRoomCode :null,
      IsRoom : '',
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

  Closeform() {
      this.isShown = false;
      this.btitle="Add Item"  
      this.resetForm();  
      this.model.topic="default";
      this.model.catagery="default";
  }
}
