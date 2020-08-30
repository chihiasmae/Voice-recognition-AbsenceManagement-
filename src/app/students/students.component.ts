import { Component, OnInit } from '@angular/core';
import {AbsenceService} from 'src/app/services/absence.service'
import { MatTableDataSource } from '@angular/material';
import { student } from '../models/student';
import { AuthenticationService } from '../services/authentication.service';
import { EmploiService } from '../services/emploi.service';
import { filiere } from '../models/filiere';

@Component({
  selector: 'wsa-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  dataa;
  displayy;
  filieres:filiere[];
  currentFiliere:string
  constructor(public absenceService: AbsenceService, public authService:AuthenticationService,public emploiFiliere:EmploiService){
   
  }
  displayedColumns = ['nom','prenom','telephone','CNE','action'];
  dataSource :MatTableDataSource<student>;
  ngOnInit(): void {
 // this.getStudent();
 this.getFilieres();
 
}
getStudent(filiere){
  this.currentFiliere=filiere
  this.absenceService.getStudents(filiere).subscribe(data => {
    this.dataSource=data;
    console.log("data",this.dataSource);
   
 });
 }
display(filiere){

  this.displayy='block';
}
getFilieres(){
  this.emploiFiliere.getAllFilieres().subscribe(data => {
    this.filieres=data;
    console.log("data",this.filieres);
   
 });
}

supprimer(id){
  console.log(id)
  this.absenceService.deleteStudent(id).subscribe((response) => {
    this.getStudent(this.currentFiliere)
    
  });
}
}
export interface Student {
  idStudent:number
  nom:Date;
 prenom:student;

 
}