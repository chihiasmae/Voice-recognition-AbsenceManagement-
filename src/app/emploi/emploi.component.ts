import { Component, OnInit } from '@angular/core';
import { MatTableDataSource,MatDialog } from '@angular/material';
import { cours } from '../models/cours';
import { EmploiService } from '../services/emploi.service';
import { FromEmploiComponent } from '../from-emploi/from-emploi.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'wsa-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit {
  dataSource:any[][];
  dataSourc2:any[][];
  dataSourc3:any;
  dataSourc4:any;
  dataSourc5:any;
  dataSourc6:any;
  filieres: any;
  constructor(public emlpoiService:EmploiService,public dialog: MatDialog, private router:Router,public authService:AuthenticationService) { }

  displayedColumns = ['module'];

  

  ngOnInit(): void {
    this.getEmploi()
    this.emlpoiService.getAllFilieres().subscribe(data => {
      this.filieres=data
      console.log(this.filieres)
    });
    //this.ngOnInit()
   }
   onselect(){
     
   }
getEmploi(){
  
  this.emlpoiService.getEmploi(1,this.emlpoiService.iD).subscribe(data => {
  
  console.log("id=", this.emlpoiService.iD);
  this.dataSource=data;
  console.log("data1", this.dataSource);
  console.log("data1", this.dataSource[0][0].libelle );
  
  });
  this.emlpoiService.getEmploi(2,this.emlpoiService.iD).subscribe(data => {
  this.dataSourc2=data;
  // console.log("data1",this.dataSourc2[0][0].libelle) ;
  //console.log("data2", this.dataSourc2);
  
  
 });
  this.emlpoiService.getEmploi(3,this.emlpoiService.iD).subscribe(data => {
  this.dataSourc3=data;
  console.log("data3", this.dataSourc3);
  console.log("data3", this.dataSourc3[1][0].libelle);
 
 });
 this.emlpoiService.getEmploi(4,this.emlpoiService.iD).subscribe(data => {
   this.dataSourc4=data;
  console.log("data4", this.dataSourc4);
  
 });
 
 this.emlpoiService.getEmploi(5,this.emlpoiService.iD).subscribe(data => {
   this.dataSourc5=data;
   console.log("data", this.dataSourc5);
 });
 
}

openDialog(): void {
  this.router.navigateByUrl("/fromEmploi")  
}
 
}
