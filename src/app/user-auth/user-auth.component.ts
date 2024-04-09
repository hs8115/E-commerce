import { Component } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from 'src/services/user.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true
  authError:string='';
  constructor(private user:UserService,private product:ProductService) {

    
  }
  ngOnInit():void{
    this.user.userAuthRelaod();
  }
  signUp(data:SignUp){
    // console.warn(data);
    this.user.userSignUp(data)
    

  }
  login(data:login){
    // console.warn(data);
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result)=>{
      // console.warn("apple",result)
      if(result){
        this.authError="User not Found";
      }else{
        this.localCartToRemoteCart()
      }
    })
  }

  openSignUp(){
this.showLogin=false;
  }
  openlogin(){
    this.showLogin=true;

  }
  localCartToRemoteCart(){
    let data =localStorage.getItem('localCart');
    let user =localStorage.getItem('user');
    let  userId =user && JSON.parse(user).id;
    if(data){
  let  cartDataList:product[]=JSON.parse(data);
      
    cartDataList.forEach( (product:product,index) =>{
      let cartData :cart ={
        ...product,
        productId: product.id,
        userId,
      };

      delete cartData.id;
  setTimeout(()=>{
    this.product.addToCart(cartData).subscribe((result)=>
      { if(result){
        console.warn("item stored in DB");

      }

      })
      if(cartDataList.length === index + 1){
        localStorage.removeItem('localCart');
      }
  },500);
    });

    }
setTimeout(()=>{
  this.product.getCartList(userId)
},2000);
}
  }
  

