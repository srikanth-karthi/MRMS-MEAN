import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ServicesService } from './services.service'; // Replace 'auth.service' with your actual service file

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: ServicesService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && token) {
          return this.handle401Error(request, next);
        }
        if(error instanceof HttpErrorResponse && error.status === 400)
        {
          return throwError(() => new Error(error.error.error));
        }
        else
        {
        let errorMessage = 'Internal Server Error. Please try again later.';
        return throwError(() => new Error(errorMessage));
        }
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
      tap((response: any) => {
        console.log('Refresh Token Response:', response); // Log the response received
      }),
      switchMap((response: any) => {
        if (response && response.newToken) {
          console.log('New Token:', response.newToken); // Log the new token received
          sessionStorage.setItem('token', response.newToken);
          const newRequest = this.addToken(request, response.newToken);
          return next.handle(newRequest);
        } else {
          console.error('Token refresh failed: New token not received'); // Log error message
          return throwError('Token refresh failed: New token not received');
        }
      }),
      catchError((error) => {
        
        console.error('Token refresh error:', error); // Log error when refreshToken() fails
        // Redirect to login or handle token refresh failure
        return throwError('Token refresh failed');
      })
    );
  }


}
