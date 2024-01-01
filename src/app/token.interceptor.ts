import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ServicesService } from './services.service'; // Replace 'auth.service' with your actual service file

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: ServicesService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && token) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap((response: any) => {
        console.log(response)
        if (response && response.newToken) {
          sessionStorage.setItem('token', response.newToken);
          const newRequest = this.addToken(request, response.newToken);
          return next.handle(newRequest);
        } else {

          return throwError('Token refresh failed');
        }
      }),
      catchError((error) => {
        // Redirect to login or handle token refresh failure
        return throwError('Token refresh failed');
      })
    );
  }
}
