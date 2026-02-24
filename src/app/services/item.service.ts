import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'; // Import the environment
import { GuidIDWrapperDto } from '../models/guid_id_wrapper';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = environment.apiUrl + 'items'; // Use the environment variable

  constructor(private http: HttpClient) { }

  getItems(
    pageNumber: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>,
    searchTerm: string | null
  ): Observable<any> {
    const requestBody = {
      pageNumber,
      pageSize,
      sortField: sortField || '',
      sortOrder: sortOrder || '',
      searchTerm: searchTerm || '',
      filters: filters.map(filter => ({
        key: filter.key,
        value: filter.value
      }))
    };

    return this.http
      .post<any>(`${this.apiUrl}/getitems`, requestBody)
      .pipe(catchError(() => of([])));
  }

  createItem(item: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/createitem`, item);
  }

  updateItem(itemId: string, item: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/updateitem`, item);
  }

  getItemById(itemId: string): Observable<any> {
    const request = new GuidIDWrapperDto(itemId);
    return this.http.post<any>(`${this.apiUrl}/getitembyid`, request);
  }

  deleteItem(itemId: string): Observable<void> {
    const request = new GuidIDWrapperDto(itemId);
    return this.http.post<void>(`${this.apiUrl}/deleteitem`, request);
  }
}
