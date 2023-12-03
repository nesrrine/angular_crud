import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScategoriesService {

  private baseUrl = 'http://localhost:5555/product'; // Assurez-vous de remplacer PORT par le bon port

  constructor(private http: HttpClient) { }

  getAllScategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/scategories`); // Utilisez correctement ${this.baseUrl} avec des backticks
  }

}
