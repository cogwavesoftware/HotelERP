
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from './../_services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        this.loaderService.show();
             return next.handle(req).pipe(
                 finalize(() => this.loaderService.hide())
            );
        // if (req.url.includes('/ResMonthlychart') || req.url.includes('/ResMonthlycharts')) {
        //    alert('1')
        //     this.loaderService.show();
        //     return next.handle(req).pipe(
        //         finalize(() => this.loaderService.hide())
        //     );
        // }
        // else
        // {
        //     alert('2')
        //     return next.handle(req).pipe(
        //         finalize(() => this.loaderService.hide())
        //     );
        // }
              
    }

}