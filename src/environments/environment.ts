import { HttpRequest } from '@angular/common/http';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// 'use strict';

import { HttpHandler ,HttpHeaders } from '@angular/common/http';

let acceptHeaders = new HttpHeaders();
acceptHeaders.append('Accept', 'q=0.8;application/json;q=0.9');
acceptHeaders.append('Access-Control-Allow-Origin', '*');

let contentTypeHeaders = new HttpHeaders();


contentTypeHeaders.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
contentTypeHeaders.append('Content-Type', 'application/json');
contentTypeHeaders.append('Access-Control-Allow-Origin', '*');
contentTypeHeaders.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
contentTypeHeaders.append('Accept', 'q=0.8;application/json;q=0.9');



export const environment = {
  production: false,
  apiURL : 'http://localhost:37425',
  BASE_ACCEPT_HEADER: acceptHeaders,
  BASE_CONTENTTYPE_HEADER: contentTypeHeaders,
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
