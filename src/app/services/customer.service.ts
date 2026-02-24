import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'; // Import the environment
import { GuidIDWrapperDto } from '../models/guid_id_wrapper';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = environment.apiUrl + 'customers'; // Use the environment variable

  constructor(private http: HttpClient) { }

  getCustomers(
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
      .post<any>(`${this.apiUrl}/getcustomers`, requestBody)
      .pipe(catchError(() => of([])));
  }

  addCustomer(customer: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/createcustomer`, customer);
  }

  updateCustomer(customerId: string, customer: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updatecustomer`, customer);
  }

  getCustomerById(customerId: string): Observable<any> {
    const request = new GuidIDWrapperDto(customerId);
    return this.http.post<any>(`${this.apiUrl}/getcustomerbyId`, { request });
  }

  deleteCustomer(customerId: string): Observable<void> {
    const request = new GuidIDWrapperDto(customerId);
    return this.http.post<any>(`${this.apiUrl}/deletecustomer`, { request });
  }

}
