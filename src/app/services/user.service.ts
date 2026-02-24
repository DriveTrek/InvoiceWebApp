import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'; // Import the environment
import { GuidIDWrapperDto } from '../models/guid_id_wrapper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + 'users'; // Use the environment variable

  constructor(private http: HttpClient) { }

  getUsers(
    pageNumber: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<any> {
    const request = {
      pageNumber,
      pageSize,
      sortField: sortField || '',
      sortOrder: sortOrder || '',
      filters: filters.map(filter => ({
        key: filter.key,
        value: filter.value
      }))
    };

    return this.http
      .post<any>(`${this.apiUrl}/getusers`, { request })
      .pipe(catchError(() => of([])));
  }

  addUser(user: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/createuser`, user);
  }

  updateUser(userId: string, user: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/updateuser`, user);
  }

  getUserById(userId: string): Observable<any> {
    const request = new GuidIDWrapperDto(userId);
    return this.http.post<any>(`${this.apiUrl}/getuserbyid`, request);
  }

  deleteUser(userId: string): Observable<void> {
    const request = new GuidIDWrapperDto(userId);
    return this.http.post<void>(`${this.apiUrl}/deleteuser`, request);
  }
}