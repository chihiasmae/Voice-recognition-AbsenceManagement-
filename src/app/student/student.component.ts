import {AbsenceService} from 'src/app/services/absence.service';
import {Component, ViewChild, OnInit} from '@angular/core';
import { student } from '../models/student';
import { absence } from '../models/absence';
import { Observable } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MaterialModule } from '../shared/material/material.module';
import { cours } from '../models/cours';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { modu } from '../models/module';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { filiere } from '../models/filiere';
import { EmploiService } from '../services/emploi.service';
import { forEach } from 'typescript-collections/dist/lib/arrays';

@Component({
  selector: 'wsa-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns = ['student','date'];
  dataSource :Absence[]=[];
  dataa:Absence[]=[];
  name:string;
  module:string;
  dateD;
  dateF;
  username;
  filieres:filiere[]
  aBsence:absence;
  dat=new FormGroup({
    dateDebut:new FormControl(new Date()),
    dateFin:new FormControl(new Date()),
  });
  constructor(public absenceService: AbsenceService,public datepipe: DatePipe, public authService:AuthenticationService,public emploiFiliere:EmploiService){
    
 
   
  }
  ngOnInit(): void {
    this.getFilieres()
    console.log("cuurentUser",this.authService.getUsername())
    this.username=this.authService.getUsername()
    this.getAbsences()
//     this.absenceService.getAbsencesByFiliere('BDCC').subscribe(data=>{ 
//     this.dataSource = data;  
//     this.dataa=data;
// });
}

getAbsences(){
  this.absenceService.getAbsenceByStudent(this.username).subscribe((data)=>{    
   
   this.dataa=data;
   console.log(this.dataa)   
 });
 }
//  getAbsenceByFiliere(filiere){
//   this.absenceService.getAbsencesByFiliere(filiere).subscribe(data => {
//   this.dataa=data;  
//  });
//  }

//   searchByName(){
//   if(this.name!=""){
//    // console.log(this.name)
//      this.dataa=this.dataa.filter(res=>{
     
//     return res.student.nom.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
//   })}
  
//   else{this.ngOnInit()}
 
// }
async searsh(){
console.log(this.dat.value.dateDebut)
console.log(typeof(this.dat.get("dateDebut").value) )
this.dateD= new Date(formatDate(this.dat.value.dateDebut, 'yyyy,MM,dd', 'en')); 
this.dateF=new Date(formatDate(this.dat.value.dateFin, 'yyyy,MM,dd', 'en')); 
this.refresh();
this.absenceService.getAbsencebetwen(this.dateD,this.dateF).subscribe(data=>{ 
this.dataSource=data; 
});
}

searchByModule(){
  if(this.name!=""){
  //  console.log(this.module)
     this.dataa=this.dataa.filter(res=>{
     
    return res.cours.module.libelle.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
  })}
  else{this.ngOnInit()}
 
}
refresh(){
  this.absenceService.getAbsencebetwen(this.dateD,this.dateF).subscribe(data=>{ 
  this.dataSource = data;  
  this.dataa=data;
  console.log(this.dataSource)
  this.dataSource = [...this.dataSource,...this.dataa];
  });
  
}
isNull(o:Absence){
  console.log("etat",o.etat)
  if(o.etat=='null') { 
       o.etat='non bbb'
       return true
   }
   

}
isNotNull(o){
  if( o.etat !='null') {
    console.log("etat",o.etat)  
    return true 
} 
}
supprimer(id){
  console.log("id",id)
  this.absenceService.deleteAbs(id).toPromise()
}
getFilieres(){
  this.emploiFiliere.getAllFilieres().subscribe(data => {
    this.filieres=data;
    console.log("data",this.filieres);
   
 });
}
 Annuler(){
   this.ngOnInit();
 }
}
export interface Absence {
  idAbsence:number
  etat:string ;
  date:Date;
 student:student;
 cours:cours;
 
}
