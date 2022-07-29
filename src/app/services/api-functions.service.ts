import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class Food{
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiFunctionsService {

  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { 
    
  }

  getInfo(page:any): Observable<Food[]>{
    const link = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=ZWQtNhsIJMEKJnsoGivLfhFMRf8DY2oMs3TvmrZ3&pageSize=12&pageNumber="+page;
    
    return this.httpClient.get<Food[]>(link)
    .pipe(
      tap(food => console.log("Food Search!"))
    );
  }
  getFood(id:any):Observable<Food[]>{
    const link = "https://api.nal.usda.gov/fdc/v1/food/"+id+"?api_key=ZWQtNhsIJMEKJnsoGivLfhFMRf8DY2oMs3TvmrZ3&pageSize=12&pageNumber=1";
    return this.httpClient.get<Food[]>(link)
    .pipe(tap(_=>console.log("Food Search!")))
  }

  

}
