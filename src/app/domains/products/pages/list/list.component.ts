import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';

import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent} from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  ngOnInit(){
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){
    this.getProducts();
  }

  addToCart(product: Product){
    //console.log('this is the parent');
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({ //Esta función se suscribe a la API y trae la información
      next: (products) => {
        this.products.set(products);
      },
      error: () => {
        console.log('API error');
      }
    });
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({ //Esta función se suscribe a la API y trae la información
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {
        console.log('API error');
      }
    });
  }
}
