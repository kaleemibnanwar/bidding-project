import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private baseUrl: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }

  getBidsForJob(jobId: number | string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + `jobs/${jobId}/bids/`, { headers });
  }

  createBidForJob(jobId: number | string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl + `jobs/${jobId}/bids/create/`, data, { headers });
  }

  updateBid(bidId: number | string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.baseUrl + `bids/${bidId}/update/`, data, { headers });
  }

  deleteBid(bidId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.baseUrl + `bids/${bidId}/delete/`, { headers });
  }

  getMyBids(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + 'bids/my', { headers });
  }
}
