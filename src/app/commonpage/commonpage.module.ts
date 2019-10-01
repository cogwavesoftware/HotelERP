

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CommonpageRoutingModule } from './commonpage-routing.module';
import { CommonpageComponent } from './commonpage.component';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// import {HttpClient,HttpClientModule } from '@angular/common/http';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@NgModule({
 
  imports: [
    CommonModule,
    CommonpageRoutingModule,
    SharedModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  ],
  declarations: [CommonpageComponent],
})
export class CommonpageModule { }
