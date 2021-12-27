import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL = config.API_URL;
  private API_KEY = config.API_KEY;
  private token: any = localStorage.getItem('token');
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('apikey', this.API_KEY)
  .set('Authorization', this.token);

  constructor( private httpClient: HttpClient) { }

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

  getAll(){
    return this.httpClient.get(this.API_URL+'/api/employees', {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  create(employeeObj:any){
    return this.httpClient.post(this.API_URL+'/api/employee', employeeObj, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  update(id:any, employeeObj:any){
    return this.httpClient.put(this.API_URL+'/api/employee/'+id, employeeObj, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  get(id:any){
    return this.httpClient.get(this.API_URL+'/api/employee/'+id, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  delete(id:string){
    return this.httpClient.delete(this.API_URL+'/api/employee/'+id, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
