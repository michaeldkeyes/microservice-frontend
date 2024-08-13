import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../model/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:9000/api/product");
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      "http://localhost:9000/api/product",
      product
    );
  }
}
