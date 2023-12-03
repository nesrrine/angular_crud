import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ProductService } from '../products.service';
import { ScategoriesService } from '../../scategories/scategories.service';
import { Product } from '../product';
import { Scategories } from 'src/app/scategories/scategories';
import { FilePondComponent } from 'ngx-filepond';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() productId: number;
  pondFiles: any[] = [];
  @ViewChild('myPond') myPond: FilePondComponent;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
    products: Product = new Product();
  scategories!: Scategories[];
  isEditing = false;
  constructor(private prodserv: ProductService, private scatserv: ScategoriesService) {}

  ngOnInit() {
    this.loadscategorie();
    if (this.productId) {
      this.loadProductDetails(this.productId);
    }
  }

  loadProductDetails(productId: number) {
    this.prodserv.getProductById(productId).subscribe(
      (product) => {
        this.products = product;
        this.isEditing = true;
        this.openModal();
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  loadscategorie() {
    this.scatserv.getAllScategories().subscribe(
      (data) => (this.scategories = data),
      (error) => console.log(error)
    );
  }

  addOrUpdateProduct() {
    if (this.isEditing) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct() {
    this.prodserv.addProduct(this.products).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  }

  updateProduct() {
    if (this.products.id && typeof this.products.id === 'number') {
      this.prodserv.updateProduct(this.products.id, this.products).subscribe((data) => {
        console.log(data);
        this.closeModal();
        window.location.reload();
      });
    } else {
      console.error('Invalid product ID');
    }
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.products = { ...product };
    this.openModal();
  }
  openModal() {
    this.display = "block";
    }
    closeModal() {
    this.display = "none";
    }

  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      process: (fieldName: any, file: any, metadata: any, load: any, error: any, progress: any, abort: any) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'dzd00atxb');
        data.append('public_id', file.name);

        this.prodserv.uploadSignature(data).subscribe({
          next: (res) => {
            this.products.imageart = res.url;
            load(res);
          },
          error: (e) => {
            console.log(e);
            error(e);
            return () => {
              abort();
            };
          },
          complete: () => {
            console.log('done');
            return () => {
              abort();
            };
          },
        });
      },
      revert: (uniqueFileId: any, load: any, error: any) => {
        error('Error');
        load();
      },
    },
  };
}
