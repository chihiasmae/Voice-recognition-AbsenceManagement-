import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CoursService } from '../services/cours.service';
import { EmploiService } from '../services/emploi.service';
import { cours } from '../models/cours';
import { DatedebutFin } from '../models/duree';
import { jour } from '../models/jour';
import { filiere } from '../models/filiere';
import { modu } from '../models/module';


@Component({
  selector: 'wsa-from-emploi',
  templateUrl: './from-emploi.component.html',
  styleUrls: ['./from-emploi.component.css']
})
export class FromEmploiComponent implements OnInit {
  modules:any[]
  filieres:any[]
  currentFiliere
 
  cours2=new cours()
  cours3=new cours()
  cours4=new cours()
  emploi:cours[]=[]
  duree:['08:30:00 - 10:30:00','10:45:00 - 12:30:00']
  data=new FormGroup({

    filiere:new FormControl(),
    lundi1 :new FormControl(),
    lundi2:new FormControl(),
    lundi3:new FormControl(),
    lundi4:new FormControl(),
    mardi1:new FormControl(),
    mardi2:new FormControl(),
    mardi3:new FormControl(),
    mardi4:new FormControl(),
    mercredi1:new FormControl(),
    mercredi2:new FormControl(),
    mercredi3:new FormControl(),
    mercredi4:new FormControl(),
    jeudi1:new FormControl(),
    jeudi2:new FormControl(),
    jeudi3:new FormControl(),
    jeudi4:new FormControl(),
    vendredi1:new FormControl(),
    vendredi2:new FormControl(),
    vendredi3:new FormControl(),
    vendredi4:new FormControl(),
  
  });
  constructor(private coursService:CoursService , private emploiService:EmploiService) { }

  ngOnInit() {
    for(let i=1;i<=4;i++){
  
    let v :string
  v="lundi"+i 
  console.log(v)
}

    this.coursService.getModules().subscribe(data => {
   this.modules=data
   console.log(this.modules)
    });

    this.emploiService.getAllFilieres().subscribe(data => {
      this.filieres=data
      console.log(this.filieres)
    });


  }
  onSubmit(){
 console.log(this.emploi)
this.emploi.forEach(element => {
  this.emploiService.saveEmploi(element).toPromise()
});

  }
 onselect(a,b,c,d){
   let  cours1=new cours()
   c=this.currentFiliere
   let duré=new DatedebutFin(d)
   let day =new jour()
   let fil=new filiere()
   let modl=new modu(a)
   this.coursService.getFiliereId(c).subscribe(data => {
  fil.idFiliere=data
    
     });
  day.idJour;
  this.coursService.getModuleId(a).subscribe(data => {
    modl.idModule=data
    console.log(data,modl.idModule)
     });
  day.idJour=b
  duré.id=d
  cours1.duree=duré
  cours1.jour=day
  cours1.filiere=fil
  cours1.module=modl
  
  this.emploi.push(cours1)
  console.log(cours1)
 }
 selectFiliere(a){
   this.currentFiliere=a
   console.log(a)
 }
}
