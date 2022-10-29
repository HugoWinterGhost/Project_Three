import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionArticlesComponent } from './gestion-articles/gestion-articles.component';
import { GestionCommandesComponent } from './gestion-commandes/gestion-commandes.component';
import { GestionNewslettersComponent } from './gestion-newsletters/gestion-newsletters.component';
import { GestionProduitsComponent } from './gestion-produits/gestion-produits.component';
import { GestionReductionsComponent } from './gestion-reductions/gestion-reductions.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'gestion-articles',
        component: GestionArticlesComponent
      },
      {
        path: 'gestion-commandes',
        component: GestionCommandesComponent
      },
      {
        path: 'gestion-newsletters',
        component: GestionNewslettersComponent
      },
      {
        path: 'gestion-produits',
        component: GestionProduitsComponent
      },
      {
        path: 'gestion-reductions',
        component: GestionReductionsComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
