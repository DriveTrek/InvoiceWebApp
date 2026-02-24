import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment'; // Import the environment
import { GuidIDWrapperDto } from '../models/guid_id_wrapper';

@Injectable({ providedIn: 'root' })
export class CustomerInvoiceService {
  private apiUrl = environment.apiUrl + 'invoices'; // Use the environment variable
  private vatUrl = environment.apiUrl + 'vat'; // VAT API URL
  private customersUrl = environment.apiUrl + 'customers'; // Customers API URL
  private usersUrl = environment.apiUrl + 'users'; // Users API URL
  private itemsUrl = environment.apiUrl + 'items'; // Users API URL
  constructor(private http: HttpClient) { }

  getCustomerInvoices(
    pageNumber: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<any> {
    const requestBody = {
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
      .post<any>(`${this.apiUrl}/getinvoices`, requestBody)
      .pipe(catchError(() => of([])));
  }

  addCustomerInvoice(customerInvoice: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/createinvoice`, customerInvoice);
  }

  updateCustomerInvoice(
    customerInvoiceId: string,
    customerInvoice: any
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/updateinvoice`,
      customerInvoice
    );
  }

  getCustomerInvoiceById(customerInvoiceId: string): Observable<any> {
    const request = new GuidIDWrapperDto(customerInvoiceId);
    return this.http.post<any>(`${this.apiUrl}/getinvoice`, { request });
  }

  deleteCustomerInvoice(customerInvoiceId: string): Observable<void> {
    const request = new GuidIDWrapperDto(customerInvoiceId);
    return this.http.post<void>(`${this.apiUrl}/deleteinvoice`, { request });
  }

  getVats(): Observable<any[]> {
    return this.http.post<any[]>(`${this.vatUrl}/getvat`, {}).pipe(catchError(() => of([])));
  }

  getCustomers(): Observable<any[]> {
    return this.http
      .post<any>(`${this.customersUrl}/getcustomers`, {})
      .pipe(catchError(() => of([])));
  }

  getUsers(): Observable<any[]> {
    return this.http.post<any[]>(`${this.usersUrl}/getusers`, {}).pipe(catchError(() => of([])));
  }
  getItems(): Observable<any[]> {
    return this.http.post<any[]>(`${this.itemsUrl}/getitems`, {}).pipe(catchError(() => of([])));
  }

  makePdfInvoice(customerInvoiceId: string) {
    const request = new GuidIDWrapperDto(customerInvoiceId);
    const url = `${this.apiUrl}/generateinvoicepdf`;
    return this.http.post(url, { request }, { responseType: 'blob' });
  }

  emailInvoice(customerInvoiceId: string): Observable<any> {
    const request = new GuidIDWrapperDto(customerInvoiceId);
    return this.http.post<any>(`${this.apiUrl}/sendinvoiceemail`, { request });
  }
}
