import { Component, OnInit, inject } from "@angular/core";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { ProductService } from "../services/product.service";
import { OrderService } from "../services/order.service";
import { Router } from "@angular/router";
import { Product } from "../model/product";
import { Order } from "../model/order";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  isAuthenticated = false;
  products: Product[] = [];
  quantityIsNull = false;
  orderSuccess = false;
  orderFailed = false;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        this.productService.getProducts().subscribe((product) => {
          this.products = product;
        });
      }
    );
  }

  goToCreateProductPage(): void {
    this.router.navigateByUrl("/add-product");
  }

  orderProduct(product: Product, quantity: string): void {
    this.oidcSecurityService.userData$.subscribe((result) => {
      const userDetails = {
        email: result.userData.email,
        firstName: result.userData.firstName,
        lastName: result.userData.lastName,
      };

      if (!quantity) {
        this.orderFailed = true;
        this.orderSuccess = false;
        this.quantityIsNull = true;
      } else {
        const order: Order = {
          skuCode: product.skuCode,
          price: product.price,
          quantity: parseInt(quantity),
          userDetails,
        };

        this.orderService.orderProduct(order).subscribe({
          next: () => {
            this.orderSuccess = true;
            this.orderFailed = false;
            this.quantityIsNull = false;
          },
          error: () => {
            this.orderSuccess = false;
            this.orderFailed = true;
            this.quantityIsNull = false;
          },
        });
      }
    });
  }
}
