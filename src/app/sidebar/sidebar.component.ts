import { Component, OnInit, Injectable } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { VERSION } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SidebarService } from 'src/app/sidebar/sidebar.service';

@Component({
  selector: 'wsa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]

})
@Injectable()
export class SidebarComponent implements OnInit {
  menus = [];
  version = VERSION;
  mode = 'side'
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;
 
  name;
  userss;
 
  constructor( private bpo: BreakpointObserver, private router: Router,public sidebarservice: SidebarService) { 
    this.menus = sidebarservice.getMenuList();
  }
 
  ngOnInit() {
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
  }
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
