import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { API_URL } from '../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Error ${error.status} ${error.message}`);
      console.error(error.error);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened with the API request');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getChatScript(): Observable<any> {
    return this.http.get(API_URL, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getResult(data): Observable<any> {
    // const url = `${API_URL}/add_with_students`;

    return this.http.post(API_URL, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
