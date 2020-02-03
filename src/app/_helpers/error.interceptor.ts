import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService,UserService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
       
        return next.handle(request).pipe(catchError(err => {
            console.log(err)
            if (err.status === 401) 
            {
                alert(4001)
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
   
            const error = err.error.error_description || err.statusText;
           // console.log(error)
           
            let currenterror = JSON.stringify(err.error.error_description) 
           // alert(currenterror)
            return throwError(currenterror);
        }))
    }
}