import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { SignUp, login } from 'src/app/data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {


  isSellerLoggeddIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  // router: any;

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    // console.warn("service call")
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggeddIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    });
  }
  reloadSeller() {

    if (localStorage.getItem('seller')) {
      this.isSellerLoggeddIn.next(true)
      this.router.navigate(['seller-home'])
    }


  }
  userLogin(data: login) {

    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{ observe: 'response' }).subscribe((result: any) => {
      
      if (result && result.body && result.body.length) {
        console.warn("user logged in")
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])

      }
      else {
        console.warn("login failed");
        this.isLoginError.emit(true)
      }
    })

  }

}
