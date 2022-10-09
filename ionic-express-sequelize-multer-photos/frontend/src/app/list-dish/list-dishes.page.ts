import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-list-dishes',
  templateUrl: './list-dishes.page.html',
  styleUrls: ['./list-dishes.page.scss'],
})
export class ListDishesPage implements OnInit {

  dishes: any = [];
  searchDish: string;

  constructor(private dishService: DishService, private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.getAllDishes();
  }

  getAllDishes() {
    this.dishService.getDishes().subscribe(dishes => {
      console.log(dishes);
      this.dishes = dishes;
    })
  }

  
  addDish(){
    this.router.navigateByUrl("/add-dish");
  }


  removeDish(dish) {
    if (window.confirm('Are you sure')) {
      this.dishService.deleteDish(dish.id)
      .subscribe(() => {
        this.getAllDishes();
        console.log('Dish deleted!')
      })
    }
  }
}
