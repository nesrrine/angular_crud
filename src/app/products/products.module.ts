import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CloudinaryModule} from '@cloudinary/ng';
import { ProductsRoutingModule } from './products-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { MatPaginatorModule } from  '@angular/material/paginator';

// import and register filepond file type validation plugin
import  * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import  * as FilepondPluginImageEdit from 'filepond-plugin-image-edit';
import  * as FilepondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginFileValidateType,FilepondPluginImageEdit,FilepondPluginImagePreview);

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    IndexComponent,
    ViewComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CloudinaryModule,
    FilePondModule,
    BrowserAnimationsModule,
    MatPaginatorModule


  ]
})
export class ProductsModule { }
