import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'orcamentos',
    loadChildren: () => import('./gestao/orcamentos/orcamentos.module').then( m => m.OrcamentoPageModule)
  },
  {
    path: 'orcamentos/list',
    loadChildren: () => import('./gestao/orcamentos/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'pagto-antecipado',
    loadChildren: () => import('./gestao/pagto-antecipado/pagto-antecipado.module').then( m => m.PagtoAntecipadoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./gestao/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },


  // {
  //   path: 'gestao',
  //   loadChildren: () => import('./gestao/gestao.module').then(m => m.gestaoPageModule)
  // }

 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
