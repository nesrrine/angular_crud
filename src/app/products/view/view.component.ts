import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ProductService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() productId: any;
  @ViewChild('myModal') myModal!: ElementRef;
  display = 'none';
  product: Product = new Product();

  constructor(private prodserv: ProductService) {}

  ngOnInit() {
    this.prodserv.getProductById(this.productId).subscribe(
      (data) => {
        this.product = data;
        this.openModal(); // Ouvre la modal une fois que les données du produit sont récupérées
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  openModal() {
    this.display = 'block';
  }

  closeModal() {
    this.display = 'none';
  }
}
