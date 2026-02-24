import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'; // Import the environment
import { GuidIDWrapperDto } from '../models/guid_id_wrapper';

@Injectable({ providedIn: 'root' })
export class VatService {
  private apiUrl = environment.apiUrl + 'vat'; // Use the environment variable for VAT API

  constructor(private http: HttpClient) {}

  getVats(
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
      .post<any>(`${this.apiUrl}/getvat`, requestBody)
      .pipe(catchError(() => of([])));
  }

  addVat(vat: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/createvat`, vat);
  }

  updateVat(vatId: string, vat: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/updatevat`, vat);
  }

  getVatById(vatId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${vatId}`);
  }

  deleteVat(vatId: string): Observable<void> {
    const request = new GuidIDWrapperDto(vatId);
    return this.http.post<void>(`${this.apiUrl}/getvatbyid`, request);
  }
}
