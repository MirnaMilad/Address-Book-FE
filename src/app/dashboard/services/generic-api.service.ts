import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {
  baseUrl: string;
  status = new BehaviorSubject("Entries");
  statusSubscription$:Subscription;

  entityName;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.statusSubscription$=this.status.subscribe(
      res=>this.entityName = res
    )

  }
  getAllItems() {
      const url = this.baseUrl + this.entityName;
      return this.httpClient.get(url);
  }

  getItemById(id){
    const url = this.baseUrl + this.entityName + '/' + id;
    return this.httpClient.get(url);
  }

  createNewItem(newItem) {
    if(this.entityName =="Entry"){
      newItem = {
        ...newItem,
        photo: 'string',
      };
    }
    
    const url = this.baseUrl + this.entityName;
    return this.httpClient.post(url, newItem);
  }

  editItem(id , updatedItem) {
    let item = {
      ...updatedItem,
      id:id,
      photo: 'string',
    };
    const url = this.baseUrl + this.entityName+ '/' + id ;
    return this.httpClient.put(url, item);
  }

  deleteItem(id){
    const url = this.baseUrl+ this.entityName + '/' + id ;
    return this.httpClient.delete(url, id);
  }
  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
