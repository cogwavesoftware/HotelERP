
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user'
import { loginMaster } from '../_models/loginMaster';
import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/catch';
import { Alert } from 'selenium-webdriver';
import { stringify } from '@angular/compiler/src/util';
import { SuperAdmin } from '../_models/SuperAdmin';
import { Menus } from 'src/app/_models/Menu';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService { 

   userc:User;
   credentials:string;
   bas:string;
   private _username: string;
 constructor(private http: HttpClient) { }

    gologin(username, password) 
    {       
         let urlSearchParams = new URLSearchParams();
         urlSearchParams.append('UserName', username);
         urlSearchParams.append('Password', password);
         urlSearchParams.append('grant_type', 'password');
        let body = urlSearchParams.toString()
        return this.http.post<any>(environment.apiURL + '/token',  body,{ headers:environment.BASE_CONTENTTYPE_HEADER }) 
        .pipe(map(user => {
            // login successful if there's a user in the response
            if (user) 
            {                 
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
               //localStorage.setItem('logincredential', JSON.stringify(user.authdata));
                localStorage.setItem('currentUser', JSON.stringify(user));              
            }      
            return user;
        })); 
    }

    // getAll(): Menus[] 
    // {
    //   let MENUITEMS = 
    //   [{"label":"HMS Software","main":[{"MainId":1,"state":"Control Panel","short_label":"Co","main_state":"Control Panel","target":false,"name":"Control Panel","type":"sub","icon":"icon-home","children":[{"formId":1,"state":"User Creation","target":false,"name":"User Creation","type":"link","children":[]},{"formId":2,"state":"User Rights","target":false,"name":"User Rights","type":"link","children":[]},{"formId":3,"state":"Database Backup","target":false,"name":"Database Backup","type":"link","children":[]},{"formId":4,"state":"Tax Rule Creation","target":false,"name":"Tax Rule Creation","type":"link","children":[]},{"formId":5,"state":"Tax Rule Setup","target":false,"name":"Tax Rule Setup","type":"link","children":[]},{"formId":6,"state":"Power System Setup","target":false,"name":"Power System Setup","type":"link","children":[]},{"formId":7,"state":"Tool Setup","target":false,"name":"Tool Setup","type":"link","children":[]}]},{"MainId":2,"state":"Master","short_label":"Ma","main_state":"Master","target":false,"name":"Master","type":"sub","icon":"icon-layout-cta-right","children":[{"formId":8,"state":"Floor Creation","target":false,"name":"Floor Creation","type":"link","children":[]},{"formId":9,"state":"RoomType Creation","target":false,"name":"RoomType Creation","type":"link","children":[]},{"formId":10,"state":"Room Organiser","target":false,"name":"Room Organiser","type":"link","children":[]},{"formId":11,"state":"Guest Creation","target":false,"name":"Guest Creation","type":"link","children":[]},{"formId":12,"state":"Company Creation","target":false,"name":"Company Creation","type":"link","children":[]},{"formId":13,"state":"Plan Creation","target":false,"name":"Plan Creation","type":"link","children":[]},{"formId":14,"state":"Credit Card Creation","target":false,"name":"Credit Card Creation","type":"link","children":[]},{"formId":15,"state":"Bank Name Creation","target":false,"name":"Bank Name Creation","type":"link","children":[]},{"formId":16,"state":"Welet Creation","target":false,"name":"Welet Creation","type":"link","children":[]},{"formId":17,"state":"Tax","target":false,"name":"Tax","type":"sub","children":[{"state":"TaxMaster","target":true,"name":"TaxMaster"},{"state":"Tax Description","target":true,"name":"Tax Description"}]}]},{"MainId":3,"state":"Operation","short_label":"Op","main_state":"Operation","target":false,"name":"Operation","type":"sub","icon":"icon-view-grid","children":[]},{"MainId":4,"state":"Checkin","short_label":"Ch","main_state":"Checkin","target":false,"name":"Checkin","type":"sub","icon":"icon-layout-grid2-alt","children":[]},{"MainId":5,"state":"Reservation","short_label":"Re","main_state":"Reservation","target":false,"name":"Reservation","type":"sub","icon":"icon-reload rotate-refresh","children":[]},{"MainId":6,"state":"Dashboard","short_label":"Da","main_state":"Dashboard","target":false,"name":"Dashboard","type":"sub","icon":"icon-crown","children":[]},{"MainId":7,"state":"NightAduit","short_label":"NI","main_state":"NightAduit","target":false,"name":"NightAduit","type":"sub","icon":"icon-layers","children":[]},{"MainId":8,"state":"Search","short_label":"Se","main_state":"Search","target":false,"name":"Search","type":"sub","icon":"icon-pencil-alt","children":[]}]},{"label":"House Keeping","main":[]},{"label":"Maintance","main":[]},{"label":"Sales Module","main":[]},{"label":"Maketing Module","main":[]},{"label":"Customer Module","main":[]}];
    //   return MENUITEMS;
    // }
  

    getmenuC() 
    {
   
      let id = localStorage.getItem('id');
      
      let IsRole = localStorage.getItem('IsRole');
      
      if(IsRole=="Admin")
      {
        return this.http.get(environment.apiURL + '/api/common/HMSAccount/GetMenu');
      }
      else
      {
        
        return this.http.get(environment.apiURL + '/api/common/HMSAccount/GetMenuById?id=' + id);
      }
     
    }
     
    setUserName(username) {
      console.log('setUserName' + username);
      this._username = username;
    }

    getUserName() {
      console.log('getUserName' + this._username);
      return this._username;
    }
    gosuperadminlogin(username, password) 
    {       
         let urlSearchParams = new URLSearchParams();
         urlSearchParams.append('UserName', username);
         urlSearchParams.append('Password', password);
         urlSearchParams.append('grant_type', 'password');
        let body = urlSearchParams.toString()
        return this.http.post<any>(environment.apiURL + '/postoken',  body,{ headers:environment.BASE_CONTENTTYPE_HEADER }) 
        .pipe(map(user => {
            // login successful if there's a user in the response
            if (user) 
            {      
              alert("user")           
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
               //localStorage.setItem('logincredential', JSON.stringify(user.authdata));
                localStorage.setItem('currentUser', JSON.stringify(user));              
            }      
            return user;
        })); 
    }

    GetloginuserDetails(username): Observable<loginMaster>
    {   
      return this.http.get<loginMaster>(environment.apiURL + '/api/common/HMSAccount/Getlogin?username=' + username) 
      .catch(this.errorHandler); 
    }

    GetloginuserDetailsbyMobileno(mobileno): Observable<loginMaster>
    {
       
      return this.http.get<loginMaster>(environment.apiURL + '/api/common/HMSAccount/Getlogin?mobileno=' + mobileno) 
      .catch(this.errorHandler); 
    }

     GenerateonetimeOTP(mobileno)   
     {
      
      return this.http.get(environment.apiURL + '/api/common/HMSAccount/GetOTP?mobileno=' + mobileno) 
      .catch(this.errorHandler);
     }
    
     OneTimpOTPForSuperAdmin(mobileno)   
     {
      
      return this.http.get(environment.apiURL + '/api/common/HMSAccount/GetOTP?mobileno=' + mobileno) 
      .catch(this.errorHandler);
     }

    errorHandler(error: HttpErrorResponse)
    {
     return Observable.throw(error.message || "server ERROR");
    }

    getData(): Observable<any>
    {
      return this.http.get<any>(environment.apiURL).pipe(catchError(this.handleerror));
    }
    
    handleerror(err)
    {
      if(err instanceof HttpErrorResponse)
      {
          //server seide
      }
      else
      {
          //Clientside
      }
      return throwError(err);
    }
    // getbranchDetails()
    // {
    //     console.log('getbranchservicecall')  
    //     return this.http.get(environment.apiURL+'/api/common/company/Getcompany', {headers: environment.BASE_ACCEPT_HEADER})
    // }
 
    // getUserDetailss(username, password)
    // {
    //   return this.http.get<any>(environment.apiURL + '/api/common/Account/GetuserDetails?username=' + username + '&password=' + password) 
    //   .pipe(map(user => {  
    //     if (user) 
    //     {
    //       console.log(user);
    //     }      
    //     return user;
    // }));
    // }

    GetsuperAdminloginDetails(): Observable<SuperAdmin>
    {    
      return this.http.get<SuperAdmin>(environment.apiURL + '/api/common/HMSAccount/GetSuperAdminlogin') 
      .catch(this.errorHandler); 
    } 
    logout() 
    {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');   
        localStorage.removeItem('id');   
        localStorage.removeItem('BranchCode');   
       localStorage.removeItem('IsRole');
    }
}










// loginsoldworking(username, password) {
//     var headers = new HttpHeaders();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     let urlSearchParams = new URLSearchParams();
//     urlSearchParams.append('Username', username);
//     urlSearchParams.append('Password', password);
//     urlSearchParams.append('grant_type', 'password');
//     let body = urlSearchParams.toString()
//     console.log(body);
//     return this.http.post(environment.apiURL  + '/token', body, { headers: headers })         
// }











// login(username: string, password: string) 
//     {
//         return this.http.post<any>(`/users/authenticate`, { username, password })
//             .pipe(map(user => {
//                 // login successful if there's a user in the response
//                 if (user) 
//                 {
//                     // store user details and basic auth credentials in local storage 
//                     // to keep user logged in between page refreshes
//                     user.authdata = window.btoa(username + ':' + password);
//                     localStorage.setItem('currentUser', JSON.stringify(user));
//                 }
//                 return user;
//             }));
//     }







// gologins(username, password) 
//     {
       
//         // var headers = new HttpHeaders();
//         // headers.append('Content-Type', 'application/x-www-form-urlencoded');
//          let urlSearchParams = new URLSearchParams();
//          urlSearchParams.append('UserName', username);
//          urlSearchParams.append('Password', password);
//          urlSearchParams.append('grant_type', 'password');
//         let body = urlSearchParams.toString()
//         this.credentials = username + ":" + password;
//         this.bas = "bearer " + window.btoa(this.credentials);

//         let rqheaders = new HttpHeaders();
//         rqheaders.append('Content-Type','application/json');
//         rqheaders.append('Authorization',this.bas);     
//         return this.http.post<any>(environment.apiURL + '/token',  body,{ headers: rqheaders }) 
//         .pipe(map(user => {
           
//             if (user) 
//             { 
//                 alert("user");  
//                 user.authdata ="bearer " + window.btoa(username + ':' + password);
//                 localStorage.setItem('currentUser', JSON.stringify(user)); 
//                 localStorage.setItem('currentUser1', user.authdata);       
//             }      
//             return user;
//         })); 
//     }







    // submitSplitAfterBill(url, splitfood) {
    //     let body = JSON.stringify(splitfood);
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new HttpRequest({ headers: headers });
    //     return this.http.post('http://' + url + '/api/kot/splitbill', body, options)
    //       .map(res => res.json());
    //   }



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
// import { Observable, observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import { User } from './user.model';

// @Injectable()
// export class UserService {
//   readonly rootUrl = 'http://localhost:35257';
//   constructor(private http: HttpClient) { }

//   registerUser(user: User,roles : string[]) {
//     const body = {
//       UserName: user.UserName,
//       Password: user.Password,
//       Email: user.Email,
//       FirstName: user.FirstName,
//       LastName: user.LastName,
//       Roles : roles
//     }
//     var reqHeader = new HttpHeaders({'No-Auth':'True'});
//     return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
//   }

//   userAuthentication(userName, password) {
//     var data = "username=" + userName + "&password=" + password + "&grant_type=password";
//     var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
//     return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
//   }

//   getUserClaims(){
//    return  this.http.get(this.rootUrl+'/api/GetUserClaims');
//   }

//   getAllRoles() {
//     var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
//     return this.http.get(this.rootUrl + '/api/GetAllRoles', { headers: reqHeader });
//   }

//   roleMatch(allowedRoles): boolean
//    {
//     var isMatch = false;
//     var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
//     allowedRoles.forEach(element => {
//       if (userRoles.indexOf(element) > -1) {
//         isMatch = true;
//         return false;
//       }
//     });
//     return isMatch;
//   }
// }
