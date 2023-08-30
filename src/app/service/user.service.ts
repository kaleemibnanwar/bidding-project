import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', data);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'register/', data);
  }

  logout(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl + 'logout/', {}, { headers });
  }

  me(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + 'me/', { headers });
  }

  confirmEmail(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'account-confirm-email/', data);
  }
}
