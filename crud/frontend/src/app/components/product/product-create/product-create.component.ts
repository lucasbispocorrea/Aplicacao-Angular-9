import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {   
    
    name: '',
    price: null
  }

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    // Primeiro, obtenha todos os produtos para encontrar o maior ID
    this.productService.read().subscribe(products => {
      // Calcula o maior ID existente ou usa 0 se não houver produtos
      const maxId = products.length > 0 ? Math.max(...products.map(p => p.id || 0)) : 0;
      
      // Define o novo ID sequencial
      this.product.id = maxId + 1;

      // Envia o produto com o novo ID
      this.productService.create(this.product).subscribe(() => {
        this.productService.showMessage('Produto Criado!');
        this.router.navigate(['/products']);
      });
    });
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }

}
