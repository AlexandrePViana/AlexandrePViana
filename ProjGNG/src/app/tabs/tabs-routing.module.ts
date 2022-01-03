import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'document',
        loadChildren: () => import('../document/document.module').then(m => m.DocumentPageModule)
      },
      {
        path: 'gestaoHome',
        loadChildren: () => import('../gestao/gestao.module').then(m => m.gestaoPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      //  {
      //    path: 'tab3',
      //    loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      //  },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
