import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import {student} from 'src/app/models/student'
import { absence } from '../models/absence';
import { puts } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
 maDate1: Date = new Date(2020,6,2 );
 maDate2: Date = new Date(2020,5,12);
  data;
 
  constructor(private http: HttpClient) { }
  getAbsences(){
  
    return this.http.get<any>(`http://localhost:8080/studentAbsents`);

  }
  getAbsencesByFiliere(filiere){
  
    return this.http.get<any>(`http://localhost:8080/studentAbsents/`+filiere);

  }
  deleteAbs(id){
  //console.log(id)
    return this.http.delete(`http://localhost:8080/deleteAbs/`+id);
    

  }
 
  deleteStudent(id){
    //console.log(id)
      return this.http.delete(`http://localhost:8080/deleteStudent/`+id);
      
  
    }
  getStudents(filiere){
    
    return this.http.get<any>(`http://localhost:8080/studentF/`+filiere);
  }
  getStudentByName(s:string){

    return this.http.get<any>(`http://localhost:8080/studentBynom/`+s);
  }
  saveAbsence(s:absence){
    console.log("a",s);
   return this.http.post('http://localhost:8080/absences/',s);
  }
  saveStudent(s:student){
    console.log("s",s)
    return this.http.post('http://localhost:8080/students/',s);
   }
   getAbsenceByStudent(s){
     console.log("ss",s)
    return this.http.get<any>(`http://localhost:8080/absenceByStudent/`+s);
  }
   getStudentAbsent(list:string[]){
     console.log(list);
    return this.http.get<any>(`http://localhost:8080/absents/`+list);
  }
  getAbsencebetwen(maDate1:Date,maDate2:Date){
    console.log(maDate1,maDate2)
    return this.http.get<any>(`http://localhost:8080/betwenn/`+maDate1+'/'+maDate2);
  }
  updateEtat(etat,id){
    console.log("serviceUpdate",etat,id)
    return this.http.put('http://localhost:8080/updateEtat/'+id,etat);
  }
 
}
