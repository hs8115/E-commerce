
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot,  CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { SellerService } from './services/seller.service';
import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { SellerService } from 'src/services/seller.service';
 
@Injectable({  
  providedIn: 'root'
})
export class authGuard implements CanActivate{
 
  constructor(private sellerService: SellerService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('seller')) {
      return true
    }
    return this.sellerService.isSellerLoggeddIn;
  }
}
 