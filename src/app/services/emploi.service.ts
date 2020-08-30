import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { retry } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class EmploiService {
iD;
module;
  constructor(private http: HttpClient) { 
   // this.id=this.getFiliereid();
  }
  getEmploi(id:number, id2:string){
    return this.http.get<any>(`http://localhost:8080/Coursmodules/`+id+'/'+id2);
  }
  getFiliereid(id:string,module:string){
    this.iD=id;
    this.module=module;
    console.log("emploiservice",id);
    return id;
  
  };
getAllFilieres(){
  return this.http.get<any>(`http://localhost:8080/filieres/`);
}
saveEmploi(emploi){
  console.log("emploi:",emploi)
  return this.http.post(`http://localhost:8080/saveCours`,emploi);
}
}
