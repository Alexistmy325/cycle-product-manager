// src/app/core/interceptors/api-key.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private readonly MASTER_KEY = 'Alexis325';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Solo añadir la cabecera a peticiones al API (ajusta la URL base si la tienes en environment)
    if (req.url.startsWith('https://localhost:7120')) {
      const cloned = req.clone({
        setHeaders: { 'X-Master-Key': this.MASTER_KEY }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
