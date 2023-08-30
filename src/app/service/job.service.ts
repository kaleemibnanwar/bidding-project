import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }

  getJobs(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + 'jobs/', { headers });
  }

  getMyJobs(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + 'jobs/my', { headers });
  }

  getJobDetails(jobId: number | string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + `jobs/${jobId}/`, { headers });
  }

  createJob(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl + 'jobs/create/', data, { headers });
  }

  updateJob(jobId: number | string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.baseUrl + `jobs/${jobId}/update/`, data, { headers });
  }

  deleteJob(jobId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.baseUrl + `jobs/${jobId}/delete/`, { headers });
  }
}
