import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Order } from "../model/order";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private readonly httpClient = inject(HttpClient);

  orderProduct(order: Order): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      responseType: "text" as "json",
    };

    return this.httpClient.post<string>(
      "http://localhost:9000/api/order",
      order,
      httpOptions
    );
  }
}
