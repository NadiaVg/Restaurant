import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-dishes',
    pathMatch: 'full'
  },
  {
    path: 'add-dish',
    loadChildren: () => import('./add-dish/add-dish.module').then( m => m.AddDishPageModule)
  },
  {
    path: 'list-dishes',
    loadChildren: () => import('./list-dish/list-dishes.module').then( m => m.ListDishesPageModule)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
