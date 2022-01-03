import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagtoAntecipadoPage } from './pagto-antecipado.page';

const routes: Routes = [
  {
    path: '',
    component: PagtoAntecipadoPage
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
export class PagtoAntecipadoPageRoutingModule {}
