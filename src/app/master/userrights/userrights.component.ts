import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from '../../shared/service/lib';
import { TreeviewItemService } from '../../shared/service/treeview-item.service';
@Component({
  selector: 'app-userrights',
  templateUrl: './userrights.component.html',
  styleUrls: ['./userrights.component.scss'],
  providers: [
    TreeviewItemService //tree service
]
})
export class UserrightsComponent implements OnInit {
     /* tree property */
     dropdownEnabled = true;
     items: TreeviewItem[];
     values: number[];
     config = TreeviewConfig.create({
         hasAllCheckBox: false,
         hasFilter: true,
         hasCollapseExpand: true,
         decoupleChildFromParent: false,
         maxHeight: 500 
     });
   /* tree property end */

  constructor(private service: TreeviewItemService) { }

  ngOnInit() {
    this.items = this.service.getBooks(); //tree     
  }

  /* tree property */
  onFilterChange(value: string) {
    //console.log('filter:', value);
  }
  onSelectedChange(value:string){
    //console.log('change filter:', value);
    console.log("json value" + JSON.stringify(value));
    //console.log("json parse" + JSON.parse(JSON.stringify(value)));
  }
/* end tree property */
}
