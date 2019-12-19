import { Injectable } from "@angular/core";
import { TreeviewItem } from "../../shared/service/lib";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/observable";
@Injectable({
  providedIn: "root"
})
export class TreeviewItemService {
  constructor(private http: HttpClient) {}

//   const fff={"text":"All","value":"10","Ischecked":false,"children":[{"text":"Control Panel","value":"1","Ischecked":false,"children":[{"text":"User Creation","value":"1","Ischecked":false,"children":[]},{"text":"User Rights","value":"2","Ischecked":false,"children":[]},{"text":"Database Backup","value":"3","Ischecked":false,"children":[]},{"text":"Financial Setup","value":"6","Ischecked":false,"children":[]},{"text":"Tax Rule Setup","value":"5","Ischecked":false,"children":[]}]},{"text":"Master","value":"2","Ischecked":false,"children":[{"text":"Floor Creation","value":"8","Ischecked":false,"children":[]},{"text":"RoomType Creation","value":"9","Ischecked":false,"children":[]},{"text":"Room Organiser","value":"10","Ischecked":false,"children":[]},{"text":"Guest Creation","value":"11","Ischecked":false,"children":[]},{"text":"Company Creation","value":"12","Ischecked":false,"children":[]},{"text":"Plan Master","value":"13","Ischecked":false,"children":[]},{"text":"Credit Card Creation","value":"14","Ischecked":false,"children":[]},{"text":"Bank Name Creation","value":"15","Ischecked":false,"children":[]},{"text":"Welet Creation","value":"16","Ischecked":false,"children":[]},{"text":"Tax","value":"17","Ischecked":false,"children":[{"text":"TaxMaster","value":"1","Ischecked":false},{"text":"Tax Description","value":"2","Ischecked":false}]},{"text":"Plan Creation","value":"18","Ischecked":false,"children":[]},{"text":"Purpose of Visit","value":"19","Ischecked":false,"children":[]},{"text":"Stward Master","value":"20","Ischecked":false,"children":[]},{"text":"Other Tax","value":"21","Ischecked":false,"children":[]},{"text":"Ledger Creation","value":"22","Ischecked":false,"children":[]},{"text":"Item Master","value":"23","Ischecked":false,"children":[]},{"text":"Revenu Master","value":"25","Ischecked":false,"children":[]},{"text":"Booking Reference","value":"26","Ischecked":false,"children":[]},{"text":"Address","value":"27","Ischecked":false,"children":[]},{"text":"Address Book","value":"28","Ischecked":false,"children":[]}]},{"text":"Operation","value":"3","Ischecked":false,"children":[]},{"text":"Checkin","value":"4","Ischecked":false,"children":[]},{"text":"Reservation","value":"5","Ischecked":false,"children":[]},{"text":"Dashboard","value":"6","Ischecked":false,"children":[]},{"text":"NightAduit","value":"7","Ischecked":false,"children":[]},{"text":"Search","value":"8","Ischecked":false,"children":[]}]}
  
// getBookss() 
// {
//     alert('fr')
//       return this.http.get(environment.apiURL + '/api/common/HMSAccount/userright');
// }

  getBooks(): TreeviewItem[] {
    const itCategory = new TreeviewItem({
      text: "All",
      value: "10",
      children: [
        {
          text: "Control Panel",
          value: "1",
          children: [
            { text: "User Creation", value: "1",checked:false, children: [] },
            { text: "User Rights", value: "2", checked:false, children: [] },
            { text: "Database Backup", value: "3", children: [] },
            { text: "Financial Setup", value: "6", children: [] },
            { text: "Tax Rule Setup", value: "5", children: [] }
          ]
        },
        {
          text: "Master",
          value: "2",
          children: [
            { text: "Floor Creation", value: "8", children: [] },
            { text: "RoomType Creation", value: "9", children: [] },
            { text: "Room Organiser", value: "10", children: [] },
            { text: "Guest Creation", value: "11", children: [] },
            { text: "Company Creation", value: "12", children: [] },
            { text: "Plan Master", value: "13", children: [] },
            { text: "Credit Card Creation", value: "14", children: [] },
            { text: "Bank Name Creation", value: "15", children: [] },
            { text: "Welet Creation", value: "16", children: [] },
            {
              text: "Tax",
              value: "17",
              children: [
                { text: "TaxMaster", value: "1" },
                { text: "Tax Description", value: "2" }
              ]
            },
            { text: "Plan Creation", value: "18", children: [] },
            { text: "Purpose of Visit", value: "19", children: [] },
            { text: "Stward Master", value: "20", children: [] },
            { text: "Other Tax", value: "21", children: [] },
            { text: "Ledger Creation", value: "22", children: [] },
            { text: "Item Master", value: "23", children: [] },
            { text: "Revenu Master", value: "25", children: [] },
            { text: "Booking Reference", value: "26", children: [] },
            { text: "Address", value: "27", children: [] },
            { text: "Address Book", value: "28", children: [] }
          ]
        },
        { text: "Operation", value: "3", children: [] },
        { text: "Checkin", value: "4", children: [] },
        { text: "Reservation", value: "5", children: [] },
        { text: "Dashboard", value: "6", children: [] },
        { text: "NightAduit", value: "7", children: [] },
        { text: "Search", value: "8", children: [] }
      ]
    });
    const itCategoryd = new TreeviewItem(itCategory);
    return [itCategory];
  }

  // getBooks(): TreeviewItem[] {
  //     alert('s')
  //     var Id=1;
  //     alert(environment.apiURL)
  //     this.http.get<any>(environment.apiURL + '/api/common/HMSAccount/userright')
  //     .pipe(map(use=>{
  //         const itCategoryddd=use;
  //          console.log('fr')
  //          console.log(itCategoryddd)
  //          const itCategoryd = new TreeviewItem(itCategoryddd)
  //          return [itCategoryd];
  //     }));
  //     return;
  // }

  // const itCategoryddd = {

  //         text: 'All', value: 9, children: [
  //             {
  //                 text: 'Control Panel', value: 'Control Panel',
  //                 children: [{

  //                     text: 'UserCreation', value: 'UserCreation' ,
  //                     children:[{
  //                         text: 'Tax', value: 'Tax',checked:false
  //                     }]

  //                 },

  //                 { text: 'Userrights', value: 'Userrights'  },
  //                 ]
  //             },
  //             {
  //                     text: 'Networking', value: 92, children: [
  //                     { text: 'Internet', value: "Internetvalue" },
  //                     { text: 'Security', value: 'Securityvalue',checked:false  }
  //                 ]
  //             }
  //         ]
  // };
  //     console.log('fr')
  //    console.log(itCategoryddd)
  //      const itCategoryd = new TreeviewItem(itCategoryddd)
  //      return [  itCategoryd ];
}
