
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToggleFullScreenDirective} from './fullscreen/toggle-fullscreen.directive';
import {AccordionAnchorDirective} from './accordion/accordionanchor.directive';
import {AccordionLinkDirective} from './accordion/accordionlink.directive';
import {AccordionDirective} from './accordion/accordion.directive';
import {HttpClientModule} from '@angular/common/http';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TitleComponent} from '../layout/admin/title/title.component';
import {CardComponent} from './card/card.component';
import {CardToggleDirective} from './card/card-toggle.directive';
import {ModalBasicComponent} from './modal-basic/modal-basic.component';
import {ModalAnimationComponent} from './modal-animation/modal-animation.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {DataFilterPipe} from './elements/data-filter.pipe';
import { CompareValidatorDirective } from './compare-validator.directive';
import { SelectRequiredValidatorDirective } from './select-validator.directive';
import { ConfirmValidatorDirective } from './confirm-validator.directive';
import { CalculatorComponent } from '../master/reservation/calculator/calculator.component';
import {BlockingdetailsComponent} from '../master/maindashboard/blockingdetails/blockingdetails.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import {DatePipe} from '@angular/common';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import {WebcamModule} from 'ngx-webcam';
import { LoadingComponent } from '../master/loading/loading.component';
//import { DiscountportalComponent } from '../master/maindashboard/discountportal/discountportal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    NgbModule,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    HttpClientModule,
    PerfectScrollbarModule,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    CalculatorComponent,
     BlockingdetailsComponent,
    // DiscountportalComponent,
    ClickOutsideModule,WebcamModule,
    DataFilterPipe,CompareValidatorDirective,SelectRequiredValidatorDirective,ConfirmValidatorDirective
    ,LoadingComponent
  ],
  declarations: [
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    CalculatorComponent,
     BlockingdetailsComponent,
     //DiscountportalComponent,
    DataFilterPipe,CompareValidatorDirective,SelectRequiredValidatorDirective,ConfirmValidatorDirective
  ,LoadingComponent
    
  ],
  providers: [
    {
      
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    [DatePipe]
  ] ,
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
