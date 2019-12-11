
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class UserService {
  readonly rootUrl = 'http://localhost:37425';
  constructor(private http: HttpClient) { }

  registerUser(user: User,roles : string[]) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles : roles
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(username, password) {
 
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
   
  // var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded','No-Auth':'True','Access-Control-Allow-Origin' : '*'});
// let reqHeader = new HttpHeaders();
//  reqHeader.append('Content-Type', 'application/x-www-urlencoded');
//  reqHeader.append('Access-Control-Allow-Origin', '*');
//  reqHeader.append('No-Auth','True');
var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post<any>(this.rootUrl + '/token', data, { headers: reqHeader })
    .pipe(map(user => {
      // login successful if there's a user in the response
      if (user) 
      {
          // store user details and basic auth credentials in local storage 
          // to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
         // localStorage.setItem('logincredential', JSON.stringify(user.authdata));
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user)
          localStorage.setItem('userToken', user["access_token"]);
          // localStorage.setItem('token_type', user["token_type"]);
          // localStorage.setItem('expires_in', user["expires_in"]);
      }      
      return user;
  }));
  }

  


  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootUrl + '/api/GetAllRoles', { headers: reqHeader });
  }

  roleMatch(allowedRoles): boolean
   {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
