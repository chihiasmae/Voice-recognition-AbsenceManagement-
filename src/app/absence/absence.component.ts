import {  OnInit } from '@angular/core';
import {AbsenceService} from 'src/app/services/absence.service';
import {Component, ViewChild} from '@angular/core';
import { student } from '../models/student';
import { absence } from '../models/absence';
import { Observable } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MaterialModule } from '../shared/material/material.module';
import { cours } from '../models/cours';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { modu} from '../models/module';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { filiere } from '../models/filiere';
import { EmploiService } from '../services/emploi.service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'wsa-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  displayedColumns = ['student','date'];
  dataSource :Absence[]=[];
  dataa:Absence[]=[];
  name:string;
  currentFiliere:string;
  module:string;
  dateD;
  dateF;
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
  this.getAbsenceByFiliere(this.currentFiliere)
//     this.absenceService.getAbsencesByFiliere('BDCC').subscribe(data=>{ 
//     this.dataSource = data;  
//     this.dataa=data;
// });
}

getAbsences(){
  this.absenceService.getAbsences().subscribe((data)=>{    
    
   this.dataSource=data;
   console.log("gg",this.dataSource)
   
 });
 }
 getAbsenceByFiliere(filiere){

   this.currentFiliere=filiere
   console.log("gg",this.currentFiliere)
  this.absenceService.getAbsencesByFiliere(filiere).subscribe(data => {
  this.dataa=data;  
 });
 }
withJusti(id){
console.log("idAbs",id)
let abs =new absence() ;
abs.idAbsence=id;
abs.etat='Justifiée'
console.log(id,abs.idAbsence,abs.etat)
this.absenceService.updateEtat(abs.etat,abs.idAbsence).subscribe(data => {
  this.getAbsenceByFiliere(this.currentFiliere)
 });
}

sansJusii(id){
let abs =new absence() ;
abs.idAbsence=id;
abs.etat='Non Justifiée'
console.log(id,abs.idAbsence,abs.etat)
this.absenceService.updateEtat(abs.etat,abs.idAbsence).subscribe(data => {
  this.getAbsenceByFiliere(this.currentFiliere)
 });

}
  searchByName(){
  if(this.name!=""){
    console.log(this.name)
     this.dataa=this.dataa.filter(res=>{
     
    return res.student.nom.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
  })}
  
  else{
    this.ngOnInit()
  }
}
async searsh(){
console.log(this.dat.value.dateDebut)
console.log(this.dat.get("dateDebut").value )
this.dateD= new Date(formatDate(this.dat.value.dateDebut, 'yyyy,MM,dd', 'en')); 
this.dateF=new Date(formatDate(this.dat.value.dateFin, 'yyyy,MM,dd', 'en')); 
console.log(this.dateD,this.dateF)
this.refresh();
this.absenceService.getAbsencebetwen(this.dateD,this.dateF).subscribe(data=>{ 
this.dataSource=data; 
console.log(this.dataSource)
});
}

searchByModule(){
  if(this.module!=""){
  //  console.log(this.module)
     this.dataa=this.dataa.filter(res=>{
     
    return res.cours.module.libelle.toLocaleLowerCase().match(this.module.toLocaleLowerCase());
  })}
  else{this.ngOnInit()}
 
}
refresh(){
  this.absenceService.getAbsencebetwen(this.dateD,this.dateF).subscribe(data=>{ 
  this.dataSource = data;  
  console.log(this.dataSource)
  this.dataa=data;
  console.log(this.dataSource)
  this.dataSource = [...this.dataSource,...this.dataa];
  });
  
}
supprimer(id){
  //console.log("id",id)
  this.absenceService.deleteAbs(id).subscribe((response) => {
    this.getAbsenceByFiliere(this.currentFiliere)
    
  });
}
getFilieres(){
  this.emploiFiliere.getAllFilieres().subscribe(data => {
    this.filieres=data;
  //  console.log("data",this.filieres);
   
 });
}
 Annuler(){
   this.ngOnInit();
 }
}
export interface Absence {
  idAbsence:number
  date:Date; 
 student:student;
 cours:cours;
 
}
