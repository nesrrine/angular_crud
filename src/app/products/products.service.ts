import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5555/product'; // Assurez-vous de remplacer PORT par le bon port

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`); // Utilisez correctement ${this.baseUrl} avec des backticks
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
   // Méthode pour ajouter un produit
   addProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, productData);
  }
  uploadSignature(vals: any): Observable<any>{ 
    let data = vals;
    return this.http.post('https://api.cloudinary.com/v1_1/dzd00atxb/image/upload',data)
  }
  
  updateProduct(id: number, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, updatedProduct);
  }
 
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  
}
