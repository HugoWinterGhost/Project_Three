import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AdminComponent } from './admin.component';
import { GestionCommandesComponent } from './gestion-commandes/gestion-commandes.component';
import { GestionProduitsComponent } from './gestion-produits/gestion-produits.component';
import { GestionArticlesComponent } from './gestion-articles/gestion-articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './gestion-commandes/order-details/order-details.component';
import { ProductDetailsComponent } from './gestion-produits/product-details/product-details.component';
import { ProductUpdateComponent } from './gestion-produits/product-update/product-update.component';
import { ModalDashboardComponent } from './dashboard/modal-dashboard/modal-dashboard.component';
import { UserDetailsComponent } from './dashboard/modal-dashboard/user-details/user-details.component';
import { ArticleDetailsComponent } from './gestion-articles/article-details/article-details.component';
import { ArticleUpdateComponent } from './gestion-articles/article-update/article-update.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    GestionProduitsComponent,
    GestionCommandesComponent,
    GestionProduitsComponent,
    GestionArticlesComponent,
    GestionProduitsComponent,
    OrderDetailsComponent,
    ProductDetailsComponent,
    ProductUpdateComponent,
    ModalDashboardComponent,
    UserDetailsComponent,
    ArticleDetailsComponent,
    ArticleUpdateComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class AdminModule { }
