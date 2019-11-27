import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  /**
   * Generic Method for Get API Calls
   */
  get(url: any, options?: any) {
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) =>
        throwError(this.handleError(error))
      ),
      finalize(() => {
        console.log(Error);
      })
    );
  }

  /**
   * Generic Method for POST API Calls
   */
  post(url, postBody?: any, options?) {
    return this.http.post(url, postBody).pipe(
      catchError((error: HttpErrorResponse) =>
        throwError(this.handleError(error))
      ),
      finalize(() => {
        console.log(Error);
      })
    );
  }

  /**
   * Generic Method for PUT API Calls
   */
  put(url, putData?: any, options?) {
    return this.http.put(url, putData).pipe(
      catchError((error: HttpErrorResponse) =>
        throwError(this.handleError(error))
      ),
      finalize(() => {
        console.log(Error);
      })
    );
  }

  /**
   * Generic Method for DELETE API Calls
   */
  delete(url, options?) {
    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) =>
        throwError(this.handleError(error))
      ),
      finalize(() => {
        console.log(Error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("ERROR => " + error);
    alert("ERROR => " + error);
  }
}
