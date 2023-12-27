import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericApiService {
  baseUrl: string;
  status = new BehaviorSubject('Entries');
  statusSubscription$: Subscription;

  entityName: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.statusSubscription$ = this.status.subscribe(
      (res) => (this.entityName = res)
    );
  }

  getAllItems(tableStatus) {
    const url = this.baseUrl + tableStatus;
    return this.httpClient.get(url);
  }

  getItemById(tableStatus, id) {
    const url = this.baseUrl + tableStatus + '/' + id;
    return this.httpClient.get(url);
  }

  createNewItem(tableStatus, newItem) {
    if (this.entityName == 'Entry') {
      newItem = {
        ...newItem,
        photo: 'string',
      };
    }
    const url = this.baseUrl + tableStatus;
    return this.httpClient.post(url, newItem);
  }

  editItem(tableStatus, id, updatedItem) {
    let item = {
      ...updatedItem,
      id: id,
      photo: 'string',
    };
    const url = this.baseUrl + tableStatus + '/' + id;
    return this.httpClient.put(url, item);
  }

  deleteItem(tableStatus, id) {
    const url = this.baseUrl + tableStatus + '/' + id;
    return this.httpClient.delete(url, id);
  }

  search(tableStatus, searchCriteria) {
    const url = this.baseUrl + tableStatus + '/search/' + searchCriteria;
    return this.httpClient.get(url);
  }

  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
