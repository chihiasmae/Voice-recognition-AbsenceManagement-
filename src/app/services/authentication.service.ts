import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { user } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host:string="https://localhost:8443";
  private  jwtToken=null;
  public authenticated: boolean;
  public authenticatedUser;
 public roles:any[]=[]
  // private users=[
  //   {username:"admin", password:"1234",roles:['USER','ADMIN']},
  //   {username:"user1", password:"1234",roles:['USER']},
  //   {username:"user2", password:"1234",roles:['USER']}
  // ]

  private currentUserSubject: BehaviorSubject<user>;
  public currentUser;
user=new user();
  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('currentUser')));
    //  this.currentUser = this.currentUserSubject.asObservable();
      
  }

  login(username,password){
    this.user.username=username
    this.user.password=password
    return this.http.post('http://localhost:8080/login',this.user,{observe:'response'})
    // let user;
    // this.users.forEach(u=>{
    //   if(u.username===username && u.password===password){
    //     user=u;
    //   }
    // })
    // if(user){
     // this.authenticated=true;
   // this.authenticatedUser=user;
    //   localStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));
    // }
    // else{
    //   this.authenticated=false;
    // }
    
  }

  loadUser(){
    let user=localStorage.getItem('authenticatedUser');

    if(user){
      this.authenticatedUser=JSON.parse(user);
      this.authenticated=true;
    }
  }
saveToken(jwt:string){
  this.authenticated=true;
 // this.authenticatedUser=user;
this.jwtToken= jwt
localStorage.setItem('token',jwt);
console.log(this.currentUser)
console.log(localStorage)
let jwtHelper= new JwtHelperService()
// obtenir les roles du token
this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
this.currentUser=jwtHelper.decodeToken(this.jwtToken).sub
console.log(this.currentUser)
//console.log(this.roles)
}
loadToken(){
  this.jwtToken=localStorage.getItem('token')
}
isAdmin(){
    // if(this.authenticatedUser){
    //   return this.authenticatedUser.roles.indexOf("ADMIN")>-1;
    // }
    // else return false;
    for (let r of this.roles){
      //  console.log(r)
      if(r=='ADMIN') return true;
    }
    return false;
}
isRecord(){

  for (let r of this.roles){
     // console.log(r)
    if(r=='RECORD') return true;
  }
  return false;
}
getUsername(){
  return this.currentUser;
}
isEtudiant(){
 
  for (let r of this.roles){
   //   console.log(r)
    if(r=='ETUDIANT') return true;
  }
  return false;
}
isEnseignant(){

  for (let r of this.roles){
   //   console.log(r)
    if(r=='ENSEIGNANT') return true;
  }
  return false;
}
isAuthenticated(){
  // if (this.jwtToken!=null){
  // console.log(true)
  //   return true;}
   return this.authenticated;
}

logout(){
   // this.authenticated=false;
   // this.authenticatedUser=undefined;
    this.jwtToken=null;
    this.authenticated=false;
   // localStorage.removeItem('authenticatedUser');
   localStorage.removeItem('token');

  }

}
