import { Component } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:undefined | product[]
  trendyProducts:undefined|product[]
constructor(private product:ProductService){0}
ngOnInit():void{

  this.product.popularProducts().subscribe((data)=>{
    console.warn(data);
    this.popularProducts=data;
    
  });
  this.product.trendyProducts().subscribe((data)=>{
    console.warn(data);
    this.trendyProducts=data;
  });
 
  
}
}
