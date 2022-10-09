import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDishesPage } from './list-dishes.page';

const routes: Routes = [
  {
    path: '',
    component: ListDishesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDishesPageRoutingModule {}
