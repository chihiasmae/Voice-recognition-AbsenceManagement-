import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }
  getCoursId(nameJour:string,nameFiliere:string,idDate:number) {
  console.log("cursdetal",nameJour,nameFiliere,idDate)
    return this.http.get<any>(`http://localhost:8080/coursparparm/`+nameJour+'/'+nameFiliere+'/'+idDate);

  }
  getModules(){
    return this.http.get<any>(`http://localhost:8080/modules/`);
  }
  getModuleId(module:string){
    return this.http.get<any>(`http://localhost:8080/ModuleId/`+module);
  }
  getFiliereId(filiere:string){
    return this.http.get<any>(`http://localhost:8080/filiereId/`+filiere);
  }
}
