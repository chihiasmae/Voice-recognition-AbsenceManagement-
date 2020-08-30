import { Component, OnInit, Injectable } from '@angular/core';
import {AbsenceService} from 'src/app/services/absence.service'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { VERSION } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SidebarService } from 'src/app/sidebar/sidebar.service';
import { EmploiComponent } from './emploi/emploi.component';
import { EmploiService } from './services/emploi.service';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'wsa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]

})
@Injectable()

export class AppComponent  implements OnInit{
  menus = [];
  version = VERSION;
  mode = 'side'
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;
 
  name;
  userss;
 id;
 module;
  constructor( public authService:AuthenticationService, private bpo: BreakpointObserver, private router: Router,public sidebarservice: SidebarService,public emploiService:EmploiService) { 
    this.menus = sidebarservice.getMenuList();
  
      // if(this.authService.isAuthenticated()){ 
      //    // this.caddyService.loadCaddyFromLocalStorage();
      // }
   
  }
 
  ngOnInit() {
    console.log("ggg",this.id);
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key])
    this.bpo.observe(breakpoints)
    .pipe(map(bst => bst.matches))
    .subscribe(matched => {
      

      console.log('matched');

      this.determineSidenavMode();
      this.determineLayoutGap();
    });
    
  }
  
 
    

isOpened: boolean = false;

toggleSidebar() {
  console.log('toggleSidebar clicked');
  this.isOpened = !this.isOpened;
  console.log(this.isOpened);
}
getSideBarState() {
  return this.sidebarservice.getSidebarState();
}
toggle(currentMenu) {
  if (currentMenu.type === 'dropdown') {
    this.menus.forEach(element => {
      if (element === currentMenu) {
        currentMenu.active = !currentMenu.active;
      } else {
        element.active = false;
      }
    });
    //this.isOpened =false;
  }

  
}
getFiliere(a:string,b:string){
  this.id=a;
  this.module=b;
  console.log("ggg",b);
  this.emploiService.getFiliereid(this.id,this.module);
 
}
getFilier(){
 // this.getFiliere(a:string);
}
getState(currentMenu) {

if (currentMenu.active) {
  return 'down';
} else {
  return 'up';

}
}




private determineSidenavMode(): void {
  if (
    this.isExtraSmallDevice() ||
    this.isSmallDevice()
  ) {
    this.fixedInViewport = false;
    this.mode = 'over';
    this.opened = false;
    return;
  }

  this.fixedInViewport = true;
  this.mode = 'side';
}

private determineLayoutGap(): void {
  if (this.isExtraSmallDevice() || this.isSmallDevice()) {
    this.layoutGap = '0';
    return;
  }
  this.layoutGap = '64';
}

public isExtraSmallDevice(): boolean {
  return this.bpo.isMatched(Breakpoints.XSmall);
}

public isSmallDevice(): boolean {
  return this.bpo.isMatched(Breakpoints.Small)
}
hasBackgroundImage() {
  return this.sidebarservice.hasBackgroundImage;
}
  
 

}
