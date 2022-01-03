import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { gestaoPage } from './gestao.page';

const routes: Routes = [
  {
    path: '',
    component: gestaoPage,
  },
  {
    path: 'pagto-antecipado',
    loadChildren: () => import('./pagto-antecipado/pagto-antecipado.module').then( m => m.PagtoAntecipadoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class gestaoPageRoutingModule {}
