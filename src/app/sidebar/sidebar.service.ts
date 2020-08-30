import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  toggled = false;
  _hasBackgroundImage = true;
  
  menus = [
   
    {
      title: 'Emploi',
      link:'web',
      icon: 'work_outline',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'BDCC', 
          linkk:'emploi',
          icon: 'people',
          id:1,
          
        
          
          badge: {
            text: 'Pro ',
            class: 'badge-success',
           
          }
        },
    
        {
          title: 'GMSI ',
          linkk:'emploi',
          icon: 'account_box',
          id:1,
          
        },
        {
          title: 'SEER ',
          linkk:'emploi',
          icon: 'account_box',
          id:1,
          
        },
        {
          title: 'GIL ',
          linkk:'emploi',
          icon: 'account_box',
          id:1,
          
        },
       
       
      ]
    },
    {
      title: 'Absences',
      icon: 'supervisor_account',
      link:'web',
      active: true,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'SEMESTRE 1', 
          linkk:'absence',
          icon: 'people',
          id:3,
          
        
          
          badge: {
            text: 'Pro ',
            class: 'badge-success',
           
          }
        },
        {
          title: 'SEMESTRE 2', 
          linkk:'absence',
          icon: 'people',
          id:3,
          
        
          
          badge: {
            text: 'Pro ',
            class: 'badge-success',
           
          }
        },
        {
          title: 'SEMESTRE 3', 
          linkk:'absence',
          icon: 'people',
          id:3,
          
        
          
          badge: {
            text: 'Pro ',
            class: 'badge-success',
           
          }
        },
        {
          title: 'SEMESTRE 4 ',
          linkk:'absence',
          icon: 'account_box',
          id:1,
          
        },
        
       
       
      ]
    },
    {
      title: 'Record',
      link:'record',
      icon: 'mic_none',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
     
    },
    // {
    //   title: 'Emploi',
    //   link:'etud',
    //   icon: 'laptop',
    //   active: false,
    //   type: 'dropdown',
     
    // },
    {
      title: 'Etudiants',
      link:'student',
      icon: 'supervisor_account',
      active: false,
      type: 'dropdown',
     
    },
    {
      title: 'Ajouter un Emploi',
      link:'fromEmploi',
      icon: 'supervisor_account',
      active: false,
      type: 'dropdown',
     
    },
  
    {
      title: 'Filières',
      link:'web',
      icon: 'supervisor_account',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      
      // submenus: [
      //   {
      // title: 'Filières',
      // icon: 'supervisor_account',
      // active: false,
      // type: 'dropdown',
      // badge: {
      //   text: 'New ',
      //   class: 'badge-warning'
      //  },
      //     submenuss: [
      //       {
      //         title: 'bb', 
      //         linkkk:'emploi',
      //         icon: 'people',
      //         id:3,
      //         badge: {
      //           text: 'Pro ',
      //           class: 'badge-success',
               
      //         }
      //       },
      //     ]
       // },
   // ],
 },
  
    
  ];
  constructor() { 
   
  }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }
  getSubmenuList(){
  
  }
  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
  
  
}
