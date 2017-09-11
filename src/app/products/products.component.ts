import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shoping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {
   }

  async ngOnInit() {
   this.cart$ = (await this.shoppingCartService.getCart())
   this.populateProduct();

  }

  private populateProduct() {
    this.productService
    .getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
       this.applyFillter();
    });
  }

  // setting the filtered prodcuts array
  private applyFillter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
