import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ProductService]
})
export class IndexComponent implements OnInit {
  title = 'my-crud-app';
  product: any;
  productBeingEdited: number | null = null; // Déclaration de productBeingEdited

  constructor(private ProductService: ProductService) {}

  ngOnInit(): void {
    console.log('on init...');
    this.ProductService.getAllProducts().subscribe((datas) => {
      this.product = datas;
    });
  }
  deleteProduct(id: number): void {
    this.ProductService.deleteProduct(id).subscribe(() => {
      // Supprimer localement le produit supprimé de la liste
      this.product = this.product.filter((p: any) => p.id !== id);
    });
  }
}
