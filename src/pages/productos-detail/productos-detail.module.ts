import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductosDetailPage } from './productos-detail';

@NgModule({
  declarations: [
    ProductosDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductosDetailPage),
  ],
})
export class ProductosDetailPageModule {}
