import { Routes } from "@angular/router";
import { AddProductComponent } from "./pages/add-product/add-product.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "add-product", component: AddProductComponent },
];
