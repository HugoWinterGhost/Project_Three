import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { AlertStockModalComponent } from './components/item-details/alert-stock-modal/alert-stock-modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonViewComponent } from './components/button-view/button-view.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ButtonUpdateComponent } from './components/button-view/button-update.component';

@NgModule({
  declarations: [
    AlertStockModalComponent,
    ButtonViewComponent,
    ButtonUpdateComponent,
    IndicatorComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    Ng2SmartTableModule
  ],
  exports : [
    CommonModule,
    NgbModule,
    NgbDropdown,
    FontAwesomeModule,
    Ng2SmartTableModule,
    IndicatorComponent
  ],
  providers: [
    CookieService
  ]
})
export class SharedModule { }
