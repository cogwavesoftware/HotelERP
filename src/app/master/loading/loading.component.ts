import { LoaderService } from './../../_services/loader.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    
  }

}
