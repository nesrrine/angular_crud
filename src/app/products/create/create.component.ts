import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../products.service';
import { ScategoriesService } from '../../scategories/scategories.service';
import { Product } from '../product';
import { Scategories } from 'src/app/scategories/scategories';
import { FilePondComponent } from 'ngx-filepond';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('myPond') myPond: FilePondComponent;

  @ViewChild('myModal') myModal!: ElementRef;

  display = 'none';

 
  products:Product=new Product()
  scategories!:Scategories[] ;

  constructor(private prodserv:ProductService,private scatserv:ScategoriesService){}
  ngOnInit(){
   this.loadscategorie()
  }

  loadscategorie(){
    return this.scatserv.getAllScategories().subscribe(data=>
      this.scategories=data),
      (error:any)=>console.log(error)
  }
 
  addProduct=()=>{
     this.prodserv.addProduct(this.products).subscribe((data=>{
      console.log(data)
      this.closeModal() 
      window.location.reload();
  }))
    
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
      process: (fieldName:any, file:any, metadata:any, load:any, error:any, progress:any, abort:any) => {
        
        const data=new FormData();
      
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'dzd00atxb')
        data.append('public_id', file.name)
    
        this.prodserv
        .uploadSignature(data)
        .subscribe({
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
           }
           
        })
        
        },
        revert: (uniqueFileId:any, load:any, error:any) => {
                error('Error');
                load();
      },
 
    }
  }

}
