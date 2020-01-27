import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    // {
    //     // add authorization header with basic auth credentials if available
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     var currentUser1 = localStorage.getItem('currentUser1');
    //     alert("auth");  

    //     if (currentUser && currentUser.authdata)      
    //     {
    //      const clonedreq = request.clone({
    //          headers: request.headers.set("Authorization",  currentUser1)
    //         });
    //         return next.handle(request).pipe(catchError(err => {
    //             if (err.status === 401) 
    //             {
    //                 // auto logout if 401 response returned from api
    //                // this.authenticationService.logout();
    //                // this.router.navigateByUrl('/logins');
    //                 //location.reload(true);
    //             }               
    //             const error = err.error.message || err.statusText;
    //             console.log(error);
    //             return throwError(error);
    //         }))




    //      //   request = request.clone({
    //         //      setHeaders: 
    //         //      { 
    //         //           Authorization: currentUser.access_token
    //         //       }
    //         //   });


    //     }

    //     return next.handle(request);
    // }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        debugger;
        // if (req.headers.get('No-Auth') == "True")
        //     return next.handle(req.clone());

        if ((req.url.endsWith('/token') || req.url.endsWith('/postoken'))  && req.method === 'POST') {
            return next.handle(req);
        }

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       // let acess_token = currentUser['access_token']

        if (currentUser != null) {
            let acess_token = currentUser['access_token']
            //    let request = req.clone({
            //         setHeaders: { 
            //             Authorization: `Bearer ${acess_token}`
            //         }
            //     });         
            // return next.handle(request);
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${acess_token}`)
            });
            return next.handle(clonedreq)

            //do part is not working
            // .do(
            //     event => { },
            //     error => {
            //         if (error.status === 401)
            //             this.router.navigateByUrl('/logins');
            //         else (error.status === 403)
            //         this.router.navigateByUrl('/forbidden');
            //     }
            // );
        }
        else {
            this.router.navigateByUrl('/logins');
        }
    }



}