import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp, login } from 'src/app/data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private route:Router ) { }

  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/user", user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);

        if(result){
          localStorage.setItem('user',JSON.stringify(result.body))
          this.route.navigate(['/'])
        }
      });
  }
  userLogin(data:login){
    this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result)=>{
      // console.warn(result)
if(result && result.body?.length ){
  this.invalidUserAuth.emit(true)
  // console.warn(result)
  localStorage.setItem('user',JSON.stringify(result.body[0]))
  this.route.navigate(['/'])
}else{
  this.invalidUserAuth.emit(false)

}
    })
    
  }
  userAuthRelaod(){
    if(localStorage.getItem('user'))
    {
      this.route.navigate(['/']);

    }
  }
}
