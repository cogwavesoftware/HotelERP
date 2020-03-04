import { LoaderService } from './../../_services/loader.service';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading:boolean;
  
  //isLoading: Subject<boolean> = this._loaderService.isLoading;
 
  constructor(public _loaderService: LoaderService) { 
    this._loaderService.isLoading.subscribe(res =>{
      this.isLoading = res;
      console.log(res)
  })
  }
  
  ngOnInit() {
    
  }

  

      
  
}
