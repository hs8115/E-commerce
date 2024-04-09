import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string|undefined;
  searchResult:undefined| product[];

  username:string="";
  cartItems=0;
  constructor(private router: Router , private product:ProductService){}

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      // console.warn(val.url)
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn("in sellar area")
         
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = "seller";
            
          }
        } else if(localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData= userStore && JSON.parse(userStore);
        this.username= userData.name;
        this.menuType='user';
        this.product.getCartList(userData.id);

        }
        else {
          // console.warn(" outside seller")
          this.menuType = 'default'
        }

      }
    });
    let cartData =localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })

  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/seller-auth']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query)
    {
      const element=query.target as HTMLInputElement;
    this.product.searchProduct(element.value).subscribe((result)=>{
      // console.warn(result)
      // result.length=5;
      this.searchResult=result;
    })

    }

  }
  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(val:string){
    // console.warn(val);
    this.router.navigate([`search/${val}`])

  }
  redirectToDetails(id:number){
    this.router.navigate(['/details/'+id]);
  }
 
  lists(){
    this.router.navigate(['/seller-home'])
  }

}
