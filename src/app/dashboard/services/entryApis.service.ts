import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntryApisService {
  baseUrl: string;
  entries;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getAllEntries() {
    const url = this.baseUrl + 'Entries';
    return this.httpClient.get(url);
  }

  getEntryById(id){
    const url = this.baseUrl + 'Entries/' + id;
    return this.httpClient.get(url);
  }

  createNewEntry(newEntry) {
    let entry = {
      ...newEntry,
      photo: 'string',
    };
    const url = this.baseUrl + 'Entries';
    return this.httpClient.post(url, entry);
  }

  editEntry(id , updatedEntry) {
    let entry = {
      ...updatedEntry,
      id:id,
      photo: 'string',
    };
    const url = this.baseUrl + 'Entries/' + id ;
    return this.httpClient.put(url, entry);
  }

  deleteEntry(id){
    const url = this.baseUrl + 'Entries/' + id ;
    return this.httpClient.delete(url, id);
  }
}
