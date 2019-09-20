

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user'
import { loginMaster, } from '../_models/loginMaster';
import { Observable } from "rxjs/observable";
import 'rxjs/add/operator/catch';
import { Alert } from 'selenium-webdriver';
import { stringify } from '@angular/compiler/src/util';


@Injectable({ providedIn: 'root' })
export class AuthenticationService { 

   userc:User;
   credentials:string;
   bas:string;
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
    GetloginuserDetails(username): Observable<loginMaster>
    {
       
      return this.http.get<loginMaster>(environment.apiURL + '/api/common/company/Getlogin?username=' + username) 
      .catch(this.errorHandler); 
    }

    errorHandler(error: HttpErrorResponse)
    {
     return Observable.throw(error.message || "server ERROR");
    }
    
    getbranchDetails()
    {
        console.log('getbranchservicecall')  
        return this.http.get(environment.apiURL+'/api/common/company/Getcompany', {headers: environment.BASE_ACCEPT_HEADER})
    }
 
    getUserDetailss(username, password)
    {
      return this.http.get<any>(environment.apiURL + '/api/common/Account/GetuserDetails?username=' + username + '&password=' + password) 
      .pipe(map(user => {  
        if (user) 
        {
          console.log(user);
        }      
        return user;
    }));
    }



 


    
    
    logout() 
    {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        
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
