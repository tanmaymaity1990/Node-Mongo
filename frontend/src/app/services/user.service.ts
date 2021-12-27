import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = config.API_URL;
  private API_KEY = config.API_KEY;
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('apikey', this.API_KEY);

  constructor( private httpClient: HttpClient ) { }

  // Error handling 
  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error;
    }
    return throwError(errorMessage);
 }

 create(userObj:any){
  return this.httpClient.post(this.API_URL+'/api/register', userObj, {'headers': this.headers})
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

login(userObj:any){
  return this.httpClient.post(this.API_URL+'/api/login', userObj, {'headers': this.headers})
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}


}
