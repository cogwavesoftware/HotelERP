import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef,Inject, PLATFORM_ID, } from "@angular/core";
 

@Component({
  selector: 'app-setcompliment',
  templateUrl: './setcompliment.component.html',
  styleUrls: ['./setcompliment.component.scss']
})
export class SetcomplimentComponent implements OnInit {
  rows1 = []; 
  selected = []; 
  constructor() {
    this.fetch((data) => {
      this.rows1 = data;
    });
   }

  ngOnInit() {    
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
  onSelect({ selected }) { 
 
    this.selected.splice(0, this.selected.length);

    this.selected.push(...selected);

    console.log(selected); 
  }
 
  //complementcheck(event){
   // alert("complet");
   // console.log(event.target.value);

    //if(this.complementisSelected == true){
    //  this.complementisSelected = true;
      //this.blockisSelected=false; 
    //}
    
 // }
  //blockcheck(event){
    //alert("block");
  //  console.log(event.target.value);
    //if(this.blockisSelected == true){
     // this.blockisSelected = true;
     // this.complementisSelected=false; 
   // }

  //}
  //onCheckboxChangeFn(event){
   
  //}
  onActivate(event) {
     
  }

 

  remove() {
    this.selected = [];
  }
  closeMyModalPin(event) { 
    var openModals = document.querySelectorAll(".md-show");
    for (let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show");
    }
  }

}
