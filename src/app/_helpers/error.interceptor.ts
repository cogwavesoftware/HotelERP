import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthenticationService,UserService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
       
        return next.handle(request).pipe(catchError(err => {
            console.log(err)
            if (err.status === 401) 
            {
                alert(4001)
                const error = err.error.error_description || err.statusText;
               console.log(error)
               console.log(err.error.error_description)
               console.log(err.statusText)
            let currenterror = JSON.stringify(err.error.error_description) 

                // auto logout if 401 response returned from api
                this.authenticationService.logout();
            
                location.reload(true);
            }
            console.log(err.status)
            const error = err.error.error_description || err.statusText;
           // console.log(error)
           
            let currenterror = JSON.stringify(err.error.error_description) 
           // alert(currenterror)
            return throwError(currenterror);
        }))
    }
}