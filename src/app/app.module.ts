import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { FormsModule } from '@angular/forms'; // Assurez-vous d'importer FormsModule

@NgModule({
declarations: [
AppComponent
],
imports: [
BrowserModule,
AppRoutingModule,
HttpClientModule,
FormsModule, // N'oubliez pas d'ajouter FormsModule ici

ProductsModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }