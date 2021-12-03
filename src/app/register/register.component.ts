import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterUser:any ; 

  warning:string = ""; 
  success: boolean = false; 
  loading: boolean = false ; 
  passwordMistmatch:boolean= false ; 
  RegisterUserSub: Subscription | undefined ; 

  constructor( 
    private auth : AuthService 
    ) { }

  ngOnInit(): void {

   this.RegisterUser = new RegisterUser("","","");

  }

  onSubmit(form:NgForm) : void {
    // AuthService.register(f);
    //  dataIntegrity :boolean = true ; 
     if( (this.RegisterUser.userName!= ""  ) && (this.RegisterUser.password===this.RegisterUser.password2  )  ){
      this.loading = true ; 
      console.log(form) ;
      console.log(this.RegisterUser.userName) ;

      console.log(form.value) ; 
 
      console.log(this.RegisterUser) ; 

      this.RegisterUserSub = this.auth.register(this.RegisterUser)
        .subscribe(() => {
          this.success = true ; 
          this.warning = "" ; 
          this.loading = false ; 
        }),(err:any) =>{
          console.log("Error message: " + err) ; 
          this.success = false ; 
          this.warning = err.error.message;
          this.loading = false ; 
        } 

    } else{

      this.passwordMistmatch = true ; 
      console.log("Password did not match") ; 
      
    }

  }


  ngOnDestroy(){
    this.RegisterUserSub?.unsubscribe ; 
  }


}



