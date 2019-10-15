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
}
