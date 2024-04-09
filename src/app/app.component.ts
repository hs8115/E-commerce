import { Component } from '@angular/core';
import { SellerService } from 'src/services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomm-project';
  
  constructor(private seller:SellerService) {
  
    
  }
}

