import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roomorganizer',
  templateUrl: './roomorganizer.component.html',
  styleUrls: ['./roomorganizer.component.scss']
})
export class RoomorganizerComponent implements OnInit {

  model: any = {};
  topicHasError = true;
  Roomcodes=['100','200'];
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
  public priority : string = "P";
  

  constructor() {
    this.priority="P";
    
   }

  ngOnInit() {
    
  }
  Showhide(){
    //this.resetForm();
    if (this.btitle=="Hide Form"){
     this.isShown = false;
     this.btitle="Add Item"}
    else{    
     this.isShown = true; 
     this.btitle="Hide Form"}
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

}
