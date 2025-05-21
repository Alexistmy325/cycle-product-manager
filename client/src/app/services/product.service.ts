import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API = 'https://localhost:7120/products';
  private readonly MASTER_KEY = 'Alexis325';

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    return new HttpHeaders().set('X-Master-Key', this.MASTER_KEY);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API, { headers: this.headers() });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`, { headers: this.headers() });
  }

  create(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.API, formData, { headers: this.headers() });
  }

  update(id: number, formData: FormData): Observable<void> {
    return this.http.put<void>(`${this.API}/${id}`, formData, { headers: this.headers() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, { headers: this.headers() });
  }
}
