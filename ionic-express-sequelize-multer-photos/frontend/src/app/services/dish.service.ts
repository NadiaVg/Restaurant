import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Dish } from '../interfaces/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  endPoint = "http://localhost:8080/api/dishes";

  constructor(private httpClient: HttpClient) { }

  getDishes(){
    return this.httpClient.get(this.endPoint);
  }

  findOne(id: number) {
    return this.httpClient.get(this.endPoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Dish fetched: ${id}`)),
        catchError(this.handleError<Dish>(`Get dish id=${id}`))
      );
  }

  // DECOMMENT:
  createDish(dish, blob){
    let formData = new FormData();
    formData.append("name", dish.name);
    formData.append("category", dish.category);
    formData.append("description", dish.description);
    formData.append("price", dish.price);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  deleteDish(id){
    return this.httpClient.delete<Dish>(this.endPoint + '/' +id)
    .pipe(
      tap(_ => console.log(`Dish deleted: ${id}`)),
      catchError(this.handleError<Dish>('Delete dish'))
    );
  }

  updateDish(id, dish){
    let data = new FormData();

    data.append("name", dish.name);
    data.append("category", dish.category);
    data.append("price", dish.price);

    return this.httpClient.put(this.endPoint + '/' + id, data)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 
}
