import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;



  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm) {
    if(!form.valid) {
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    let authObs:Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs=this.authService.login(email,password);
    } else {
      authObs=this.authService.signup(email,password);
    }

   authObs .subscribe({
      next:(v)=>  {this.router.navigate(['/kitaplar'])},
      error:(e)=>console.log(e),
      complete:()=>console.log('complete')
  });

    form.reset();
  }

}
