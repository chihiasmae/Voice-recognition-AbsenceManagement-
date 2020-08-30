import { Component, OnInit, Injectable } from '@angular/core';
import * as speech from '@tensorflow-models/speech-commands'
import { async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { AbsenceService } from '../services/absence.service';
import { student } from '../models/student';
import { filiere } from '../models/filiere';
import { cours } from '../models/cours';
import { absence } from '../models/absence';
import * as Collections from 'typescript-collections';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { VERSION } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SidebarService } from 'src/app/sidebar/sidebar.service';
import { EmploiService } from '../services/emploi.service';
import { CoursService } from '../services/cours.service';
import { DatedebutFin } from '../models/duree';
import { jour } from '../models/jour';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'wsa-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
})
@Injectable()


export class RecordComponent implements OnInit {
//initalise data of cours  
days = [ 'dimanche','lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
coursId:any;
currentDay:string;
currentHour:Date;
currentTime=new Date();
dureeId:number;
houre1=new Date('1995-12-17T03:24:00');
duree=new DatedebutFin(this.dureeId);
currentJour=new jour();
filieres: string[] =  [];
currentFiliere=new filiere();
currentCours=new cours();
currentPresent;

name;
userss;
id;
// initialise data of recognition 
words: any[];
prediction:{score:number,word:string}[]=[]
recognizer:speech.SpeechCommandRecognizer;
recording=false;
loading=false;
max;
compare=new Collections.Dictionary<number,string >();
resultatString:number[];
checkpointURL = "https://teachablemachine.withgoogle.com/models/q_c_O2Svc/model.json";
//metadataURL = "https://teachablemachine.withgoogle.com/models/q_c_O2Svc/metadata.json"; 
metadataURL="http://teachablemachine.withgoogle.com/models/ymZ3Vw9J1/metadata.json";

         

reco;
recognizing = false;
notification: string;
studenta: student;
studentAbsent:any;
abs=new absence();
etudiant:student;
filiere=new filiere();
maDate1: Date = new Date(2019,1,2, 12,34,56);
maDate2: Date = new Date(2019,1,2, 12,34,56);
presents:string[]=[];
ety;
cour: cours;
hour5=new Date();
  hour6= new Date();
  diff5;
  diff6;
  constructor(public authService:AuthenticationService,private coursService:CoursService, private snack:MatSnackBar,public absenceService: AbsenceService,private emploiService:EmploiService, private router: Router,public sidebarservice: SidebarService) {
    this.abs.etat='Non justifiée'
  }

ngOnInit() {


//test du fonction qui retourne le id du cours
  // this.coursService.getCoursId("mardi","BDCC",4).subscribe(data => {
  //  console.log("hhh")
  //   console.log("ff",data)
  // //  this.currentCours.idCours=this.coursId
  // });

this.hour5.setFullYear(this.currentTime.getFullYear())
this.hour5.setUTCMonth(this.currentTime.getUTCMonth())
this.hour5.setDate(this.currentTime.getDate());
this.hour5.setUTCHours(21,0,0);

console.log("condoo", this.hour5, this.currentTime)

this.hour6.setFullYear(this.currentTime.getFullYear())
this.hour6.setUTCMonth(this.currentTime.getUTCMonth())
this.hour6.setDate(this.currentTime.getDate());
this.hour6.setUTCHours(22,0,0);
this.diff5=this.currentTime.getTime()-this.hour5.getTime();
this.diff6=this.hour6.getTime()-this.currentTime.getTime();
console.log(this.hour6)
console.log("diff",this.diff5)
console.log("diif",this.diff6)
if (this.diff5>=0 && this.diff6>=0){
  console.log("true")
 // this.duree.id=3
}
else {console.log("false")}


console.log(this.currentTime.getDate())
console.log(this.currentTime.getUTCMonth())
console.log(this.currentTime.getFullYear())
console.log(this.currentTime.getTime())
console.log(this.currentTime.getUTCMonth())

console.log('Current date:',this.currentTime.toLocaleTimeString());
console.log('Current day:',this.currentJour.nomJour );

this.reco="micro";
//this.cour=new cours(3);
//this.ety=new student(8,'nn','nn','nn',this.filiere);
const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key])
this.getFilieres()  
//this.init();
//this.getAbsents();
//this.saveAbs();

}


createModel() {
   // model metadata

const recognizer = speech.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        this.checkpointURL,
        this.metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
recognizer.ensureModelLoaded();
//console.log("reco",recognizer.wordLabels());
return recognizer;
}


init=async()=> {
  try{
  this.loading=true;
  this.recognizer = speech.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
  undefined, // speech commands vocabulary feature, not useful for your models
  this.checkpointURL,
  this.metadataURL);
await this.recognizer.ensureModelLoaded();
this.words=this.recognizer.wordLabels();// get class labels
console.log("classes",this.words);
this.recording=true;
this.snack.open('Recogniser listening');
this.loading=false;
this.recognizer.listen(async(result:any)=>{
 for (let i = 0; i < this.words.length; i++) {
  const classPrediction =  this.words[i] + ":" + result.scores[i].toFixed(2);
  this.compare.setValue( result.scores[i],this.words[i])
  //this.resultatString=this.words[this.max];
  //console.log("liste",this.presents)
  console.log("predi",classPrediction);
  } 
  console.log("max",this.compare.values());
  this.max= Math.max(...this.compare.keys());
    // this.max= Math.max.apply(this.compare.values());
  console.log("max",this.max);
  console.log("maxword",this.compare.getValue(this.max));
  //nommer le current present
  this.currentPresent=this.compare.getValue(this.max)
  this.presents.push(this.compare.getValue(this.max));
  console.log("list",this.presents);
  this.getAbsents();
  this.snack.open('Bienvenue   '+this.currentPresent+'!  ' + '   Vous etes présent(e)' , 'Merci',{
    duration: 6000,
  });
  
 
  
      //  const scores=Array.from(result.scores).map((s,i)=>({
      //   score:s,word:this.words[i]}))as {score:number,word:string}[];
      //   scores.sort((s1,s2)=>s2.score-s1.score);
      //   this.prediction.push(scores.splice(0,1)[0]);
      //   console.log("prediction",this.prediction);

 //The number of milliseconds to wait before executing the code
// Stop the recognition in 5 seconds.
       setTimeout(() =>
       this.recognizer.stopListening(), 7000);
       this.reco="stop";
      
    },
    {probabilityThreshold:0.90});}
    catch(e){
      
      this.loading=false;
      throw e;}
}



saveAbs(){
 
  for (let i in this.studentAbsent){
    console.log("absents",this.studentAbsent)
   // let absnence= new absence();
   this.abs.cours=this.currentCours;
   // this.abs.cours=null
  this.abs.date= this.currentTime
  
  
    this.abs.student=this.studentAbsent[i]

    console.log("absents",this.abs)
    this.absenceService.saveAbsence(this.abs).toPromise();
  }
  
  
  }
  
saveStudent(){
console.log("ety:",this.ety)
this.absenceService.saveStudent(this.ety).toPromise();
  }
  
getAbsents(){
this.absenceService.getStudentAbsent(this.presents).subscribe(data => {
this.studentAbsent=data;
// this.presents.push(this.studentAbsent);
  console.log("studentAbsent",this.studentAbsent);      
});
      
}

onSelectLanguage(filiere: string) {
var hour1=new Date()
var hour2=new Date()
var hour3=new Date()
var hour4=new Date()
var hour5=new Date()
var hour6=new Date()
var hour7=new Date()
var hour8=new Date()
this.currentFiliere.name = filiere;
hour1.setFullYear(this.currentTime.getFullYear())
hour1.setUTCMonth(this.currentTime.getUTCMonth())
hour1.setDate(this.currentTime.getDate());
hour1.setUTCHours(8,30,0);

hour2.setFullYear(this.currentTime.getFullYear())
hour2.setUTCMonth(this.currentTime.getUTCMonth())
hour2.setDate(this.currentTime.getDate());
hour2.setUTCHours(10,30,0);

hour3.setFullYear(this.currentTime.getFullYear())
hour3.setUTCMonth(this.currentTime.getUTCMonth())
hour3.setDate(this.currentTime.getDate());
hour3.setUTCHours(10,45,0);

hour4.setFullYear(this.currentTime.getFullYear())
hour4.setUTCMonth(this.currentTime.getUTCMonth())
hour4.setDate(this.currentTime.getDate());
hour4.setUTCHours(12,30,0);

hour5.setFullYear(this.currentTime.getFullYear())
hour5.setUTCMonth(this.currentTime.getUTCMonth())
hour5.setDate(this.currentTime.getDate());


hour5.setUTCHours(14,0,0);

console.log("condoo", hour5, this.currentTime.getHours)

hour6.setFullYear(this.currentTime.getFullYear())
hour6.setUTCMonth(this.currentTime.getUTCMonth())
hour6.setDate(this.currentTime.getDate());
hour6.setUTCHours(16,0,0);


hour7.setFullYear(this.currentTime.getFullYear())
hour7.setUTCMonth(this.currentTime.getUTCMonth())
hour7.setDate(this.currentTime.getDate());
hour7.setUTCHours(16,15,0);

hour8.setFullYear(this.currentTime.getFullYear())
hour8.setUTCMonth(this.currentTime.getUTCMonth())
hour8.setDate(this.currentTime.getDate());
//hour8.setHours(17,0,0);
hour8.setHours(23,0,0);
console.log("h",hour8)



// console.log("day",hour1.getDay())
// console.log("day",hour1.getUTCMonth())
// console.log("day",hour1.getFullYear())
// console.log("day",hour1.toUTCString())
// console.log("day",hour1.getUTCMonth())
// console.log("day",hour1.getUTCHours())
//difference between the curent houre and the condition houre 
var diff1=this.currentTime.getTime()-hour1.getTime();
var diff2=hour2.getTime()-this.currentTime.getTime();

var diff3=this.currentTime.getTime()-hour3.getTime();
var diff4=hour4.getTime()-this.currentTime.getTime();

var diff5=this.currentTime.getTime()-hour5.getTime();
var diff6=hour6.getTime()-this.currentTime.getTime();

var diff7=this.currentTime.getTime()-hour7.getTime();
var diff8=hour8.getTime()-this.currentTime.getTime();



console.log("current",this.currentTime.getHours())
console.log("current",hour8.getHours())
console.log("diff7",diff7)

console.log("diff8",diff8)

//initialise the conditions
this.currentDay=this.days[this.currentTime.getDay()];
if(diff1>=0 && diff2>=0){
    console.log("true")
    this.duree.id=1
}
else if(diff3>=0 && diff4>=0){
  console.log("true")
  this.duree.id=2
}
else if (diff5>=0 && diff6>=0){
  console.log("true")
  this.duree.id=3
}
else if (diff7>=0 && diff8>=0){
  console.log("true")
  this.duree.id=4
  console.log("true",this.duree.id)
}
else {
  console.log("false")
 
}
  
//initalise the nameDay of the constructor
this.currentJour.nomJour=this.days[this.currentTime.getDay()];
//initalise  the constructor of  the currentCours 
this.currentCours.duree=this.duree;
this.currentCours.duree.id=this.duree.id;
this.currentCours.jour=this.currentJour;
this.currentCours.filiere=this.currentFiliere;
 
console.log("jour",this.currentCours.jour.nomJour)
//  this.speechRecognizer.setLanguage(this.currentLanguage);
this.coursService.getCoursId(this.currentCours.jour.nomJour,this.currentCours.filiere.name,this.currentCours.duree.id).subscribe(data => {
  this.coursId=data;
  console.log(this.coursId)
  this.currentCours.idCours=this.coursId
  
  
});
}


getFilieres(){
  this.emploiService.getAllFilieres().subscribe(data => {
    this.filieres=data;
    
 });
}


}
