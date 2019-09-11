import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService { 
    constructor(private http: HttpClient) { }
    login(username: string, password: string) 
    {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a user in the response
                if (user) 
                {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
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







// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
// import { Observable } from 'rxjs';
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
