import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';
import { user } from '../models/user';
@Component({
  selector: 'wsa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  res;
  mode;
  user= new user();
  username;
  password;
  public loginInvalid: boolean;
  form = new FormGroup({
    username: new FormControl(),
    password:new FormControl()
 });
  constructor(private authService:AuthenticationService,private router:Router, ) {
     // if(this.authService.isAuthenticated()){ 
         // this.caddyService.loadCaddyFromLocalStorage();
    //  }
   
   }
     

ngOnInit() {
}

onLogin(){
try {
this.loginInvalid = false;
this.username = this.form.get('username').value;
this.password = this.form.get('password').value;
this.authService.login(this.username,this.password).subscribe(response => {
console.log(response)
let jwt= response.headers.get('authorization');
this.authService.saveToken(jwt)
console.log("login",this.authService.user.username)
console.log(this.authService.roles)
this.authService.roles.forEach(element => {
  if(element=='RECORD' ){
    console.log("athorite",element)
    this.router.navigateByUrl("/record")
  }
else  if(element=='ETUDIANT')
{this.router.navigateByUrl("/etud")
}
else {this.router.navigateByUrl("/app")}

});
  });
}
   catch (error) {
    this.loginInvalid = true;
  }


 
}}
