import { Injectable } from '@angular/core';
//  import {TreeviewItem} from '../../shared/service/lib';
import {TreeviewItem} from '../../shared/service/lib';

@Injectable({
  providedIn: 'root'
})
export class TreeviewItemService {
 
  getBooks(): TreeviewItem[] {
 
    const itCategory = new TreeviewItem({
        text: 'All', value: 9, children: [
            {
                text: 'Control Panel', value: 'Control Panel', children: [{
                    
                    text: 'UserCreation', value: 'UserCreation'                    
                    
                }, 

                { text: 'Userrights', value: 'Userrights'  },
                {
                    text: 'Backend', value: 912, children: [
                        { text: 'C#', value: 9121 },
                        { text: 'Java', value: 9122 },
                        { text: 'Python', value: 9123, checked: false, disabled: true }
                    ]
                }]
            },
            {
                text: 'Networking', value: 92, children: [
                    { text: 'Internet', value: 921 },
                    { text: 'Security', value: 922 }
                ]
            }
        ]
    });
    return [  itCategory ];
    // const othersCategory = new TreeviewItem({ text: 'Others', value: 3, checked: false, disabled: true });
    
}
  constructor() { }
}
