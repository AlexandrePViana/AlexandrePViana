import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrcamentoPage } from './orcamentos.page';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoPage
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentoPageRoutingModule {}
