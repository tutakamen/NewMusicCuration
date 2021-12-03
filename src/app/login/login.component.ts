import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any ; 
  warning:string = ""; 
  userSub: Subscription | undefined ; 
  loading: boolean = false ; 

  constructor( 
    private auth : AuthService ,
    public router: Router
    ) { }

  ngOnInit(): void {

    this.user = new User("","","");

  }
  onSubmit(form:NgForm) : void {
    // AuthService.register(f);
    //  dataIntegrity :boolean = true ;       
    console.log(form.value) ; 

     if( (this.user.userName!= ""  ) && (this.user.password!="")  ){
      this.loading = true ; 
      console.log(form) ;
      console.log(form.value) ; 
      console.log(this.user) ; 

      this.userSub = this.auth.login(this.user)
        .subscribe(  (success) => {
          this.loading = false ; 
          this.auth.getToken()
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token',success.token);
        // redirect to the "vehicles" route
        this.router.navigate(['/newReleases']);
        }),(err:any) =>{
          console.log("Error message: " + err) ; 
          this.warning = err.error.message;
          this.loading = false ; 
        } 

    } else{

      console.log("Password did not match") ; 
      
    }

  }


  ngOnDestroy(){
    this.userSub?.unsubscribe ; 
  }










}
