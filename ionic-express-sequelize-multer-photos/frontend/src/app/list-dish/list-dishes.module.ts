import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListDishesPageRoutingModule } from './list-dishes-routing.module';

import { ListDishesPage } from './list-dishes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDishesPageRoutingModule, 
    Ng2SearchPipeModule
  ],
  declarations: [ListDishesPage]
})
export class ListDishesPageModule {}
